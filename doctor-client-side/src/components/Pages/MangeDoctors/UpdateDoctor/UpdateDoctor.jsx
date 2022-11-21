import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useDropzone } from 'react-dropzone'
import { MdOutlineFileUpload } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import { useLoaderData, useNavigate } from "react-router-dom";
const UpdateDoctor = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [reciveProfile, setReciveProfile] = useState('');
    const doctorsData = useLoaderData();
    const onSubmit = (data) => {

        //create image url 
        const formImage = new FormData();
        formImage.append("image", reciveProfile[0]);
        const url = `https://api.imgbb.com/1/upload?key=2225a172ce277ab804ef28ca4715e4e4`;
        fetch(url, {
            method: "POST",
            body: formImage,
        })
            .then(res => {
                if (res.status === 403) {
                    return toast.error("Forbidden access")
                }
                return res.json()
            })
            .then(resdata => {
                if (resdata.success) {
                    const profile = resdata.data.url;
                    //create an object to send back end
                    const doctorData = {
                        doctorName: data.doctorName ? data.doctorName : doctorsData.doctorName,
                        doctorEmail: data.doctorEmail ? data.doctorEmail : doctorsData.doctorEmail,
                        specialty: data.specialty ? data.specialty : doctorsData.specialty,
                        doctorProfile: profile ? profile : doctorsData.doctorProfile,
                    }
                      console.log(doctorData);

                    fetch(`https://use-me.vercel.app/doctors/${doctorsData._id}`, {
                        method: "PUT",
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('doctors-portal')}`
                        },
                        body: JSON.stringify(doctorData)
                    }).then(res => {
                        if (res.status === 403 || res.status === 401) {
                            toast.error("Forbidden access");
                            navigate("/dashboard")
                        }
                        return res.json();
                    })
                        .then(data => {
                            if (data.modifiedCount > 0) {
                                toast.success("Congratulation you have been update a doctor information successfully !! ")
                            }
                            navigate("/dashboard/manage-doctors")
                        }).catch(error => console.log(error))
                    //

                } else {
                
                        return toast.warning("Please enter your doctor profile picture")
                       
                }
            }
            )
            .catch((error) => console.log(error));
    }

    //end create user 


    //>----> 
    const onDrop = useCallback(acceptedFiles => {

        setReciveProfile(acceptedFiles);

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


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
                    <input type="text"  {...register("doctorName", { required: true })}
                        defaultValue={doctorsData.doctorName}
                        placeholder="Enter doctor full name" className="input input-bordered input-info w-full max-w-xs" />
                    {errors.doctorName && <p className="text-red-600">This field is required</p>}
                </div>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="form-control  my-2">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email"  {...register("doctorEmail", { required: true })}
                        defaultValue={doctorsData.doctorEmail}
                        placeholder="Enter doctor email" className="input input-bordered input-primary w-full max-w-xs" />
                    {errors.doctorEmail && <p className="text-red-600">This field is required</p>}
                </div>

                <div className="form-control  my-2">
                    <label className="label">
                        <span className="label-text">Specilty </span>
                    </label>
                    <input type="text"  {...register("specialty", { required: true })}
                        defaultValue={doctorsData.specialty}
                        placeholder="Enter doctor specialty" className="input input-bordered input-primary w-full max-w-xs" />
                    {errors.specialty && <p className="text-red-600">This field is required</p>}
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
                    {errors.doctorProfile && <p className="text-white py-2
                     bg-red-500 rounded-md px-6 my-3">
                        Please drop down your profile image</p>}
                    <div className="text-center ml-32">
                        <img src={doctorsData.doctorProfile} alt="doctorProfile"
                            className="w-32 h-32 rounded-full my-4" />
                    </div>
                </div>

                {/* drop down maker end  */}
                <input className="btn btn-weard w-80 my-3 ml-4" type="submit" value="Update" />
            </form>
        </>
    );
}

export default UpdateDoctor;
