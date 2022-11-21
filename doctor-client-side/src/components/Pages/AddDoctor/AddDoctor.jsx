import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useDropzone } from 'react-dropzone'
import { MdOutlineFileUpload } from "react-icons/md";
import { BeatLoader, HashLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
const AddDoctor = () => {
    const navigate = useNavigate() ;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [reciveProfile, setReciveProfile] = useState('');
    const onSubmit = (data) => {
  
    //create user 

    //create image url 
    const formImage = new FormData();
    formImage.append("image", reciveProfile[0]);
    const url = `https://api.imgbb.com/1/upload?key=2225a172ce277ab804ef28ca4715e4e4`;
    fetch(url, {
        method: "POST",
        body: formImage,
    })
        .then(res => {
            if(res.status === 403 ){
            return toast.error("Forbidden access") 
            }
           return res.json()
        })
        .then(resdata => {
            if (resdata.success) {
                const profile = resdata.data.url;
             //create an object to send back end
                const doctorData = {
                    doctorName: data.name,
                    doctorEmail: data.email,
                    specialty: data.specialty,
                    doctorProfile: profile,
                }


                fetch(`https://use-me.vercel.app/doctors`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json' , 
                        authorization:`Bearer ${localStorage.getItem('doctors-portal')}`
                    },
                    body: JSON.stringify(doctorData)
                }).then(res => {
                    if(res.status === 403 || res.status === 401){
                        toast.error("Forbidden access") ;
                        navigate("/dashboard")
                        }
                        return res.json() ;
                })
                    .then(data => {
                        console.log(data);
                        if (data.insertedId) {
                            toast.success("Congratulation you have been adding a doctor successfully !! ")
                        } 
                        navigate("/dashboard/manage-doctors")
                    }).catch(error => console.log(error))
                //

            }
        }
        )
        .catch((error) => console.log(error));
    }

    //end create user 


    //>----> 
    const onDrop = useCallback(acceptedFiles => {
        setReciveProfile(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const { data: specialities, isLoading } = useQuery({
        queryKey: ["specialities"],
        queryFn: async () => {
            const url = `https://use-me.vercel.app/appointmentSpeciality`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
    })
    if (isLoading) {
        return (
            <>
                <HashLoader color="#19D3AE" style={{margin:"15% 45%"}}></HashLoader>
            </>
        )
    }
    return (
        <>
            <Helmet> <title> Add  doctor </title> </Helmet>

            <form onSubmit={handleSubmit(onSubmit)} className="card mx-auto
            my-5 flex-shrink-0 w-full

          max-w-md px-10 py-3 shadow-2xl bg-base-100">

                <div className="form-control  my-2">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text"  {...register("name", { required: true })}
                        placeholder="Enter doctor full name" className="input input-bordered input-info w-full max-w-xs" />
                    {errors.fullName && <p className="text-red-600">This field is required</p>}
                </div>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="form-control  my-2">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email"  {...register("email", { required: true })}
                        placeholder="Enter doctor email" className="input input-bordered input-primary w-full max-w-xs" />
                    {errors.email && <p className="text-red-600">This field is required</p>}
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Speciality</span>
                    </label>
                    <select {...register("specialty", {
                        required: true
                    })}
                        className="select select-bordered select-info w-full max-w-xs my-2">
                        <option disabled selected>Pick doctor speciality ?</option>
                        {
                            specialities.map(specialty =>
                                <option key={specialty._id} value={specialty.name}>
                                    {specialty.name}
                                </option>
                            )
                        }
                    </select>
                    {errors.speciality && <p className="text-red-600">This field is required</p>}
                </div>

                {/* drop down maker  */}
                <div {...getRootProps()}>
                    <label className="label">
                        <span className="label-text">Profile</span>
                    </label>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?

                            <>
                                <div className="text-center border  
                             animate-pulse  rounded-2xl py-6 hover:cursor-pointer"
                                    style={{ border: "dotted" }}>
                                    <button className="btn-success text-white text-3xl 
                                    rounded-md font-bold">
                                        <MdOutlineFileUpload></MdOutlineFileUpload>
                                    </button>
                                    <BeatLoader className="mx-auto mt-4" color="#19D3AE"></BeatLoader>
                                </div>
                            </>

                            :
                            <>
                                <div className="text-center mt-6 
                                 rounded-2xl py-6 hover:cursor-pointer"
                                    style={{ border: "dashed" }}>
                                    <button className="btn-success text-white text-3xl rounded-md font-bold">
                                        <MdOutlineFileUpload></MdOutlineFileUpload>
                                    </button>
                                    <p className="mt-3">{reciveProfile ?
                                        "Your profile file name is " + reciveProfile[0].name
                                        : "Drag and drop doctor profile picture"}</p>
                                </div>
                            </>
                    }
                    {errors.profile && <p className="text-white py-2
                     bg-red-500 rounded-md px-6 my-3">
                        Please drop down your profile image</p>}
                </div>

                {/* drop down maker end  */}
                <input className="btn btn-weard w-80 my-3" type="submit" value="Add" />
            </form>
        </>
    );
}

export default AddDoctor;
