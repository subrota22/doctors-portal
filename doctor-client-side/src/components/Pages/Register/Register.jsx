import React, { useCallback, useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import authToken from "../../authToken/authToken";
import { Helmet } from "react-helmet";
import { useDropzone } from 'react-dropzone'
import { MdOutlineFileUpload } from "react-icons/md";
import {BeatLoader} from "react-spinners" ;
const Register = () => {

    const { createUser, updateUserProfile,
        signInWithGoogle, signInWithGithub,
        verifyEmail } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [reciveProfile, setReciveProfile] = useState('');

    const onSubmit = (data) => {
        fetch(`https://use-me.vercel.app/users`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success("Congrasulation you have been registered successfully !! ")
                } else {
                    toast.info(data.message);
                }
            }).catch(error => console.log(error))
        //create user 

        createUser(data.email, data.password)
            .then((result) => {
                //create image url 
                const formImage = new FormData();
                formImage.append("image", reciveProfile[0]);
                const url = `https://api.imgbb.com/1/upload?key=2225a172ce277ab804ef28ca4715e4e4`;
                fetch(url, {
                    method: "POST",
                    body: formImage,
                })
                    .then(res => res.json())
                    .then(resdata => {
                        //
                        updateUserProfile(data.name, resdata.data.display_url)
                            .then(() => {
                                toast.success("Welcome " + data.name + " thank to join with us !!")
                                authToken(result.user.email)
                                //verify email 
                                verifyEmail()
                                    .then(() => {
                                        return toast.success("Please check your inbox to verify your email !! ");
                                    })

                            })
                        //end data creation
                    }
                    )
                    .catch((error) => console.log(error));

            })
            .catch((error) => {
                toast.warning(error.message)
            })

        //end create user 
    };
    //google log in 
    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                toast.success("Your are login successfully by Google");
                authToken(result.user.email)
            })
            .catch(error => toast.error(error.message))
    }
    //google log in 
    const handleGithubLogin = () => {
        signInWithGithub()
            .then((result) => {
                toast.success("Your are login successfully by Github");
                authToken(result.user.email)
            })
            .catch(error => toast.error(error.message))
    }
    //-----> 
    const onDrop = useCallback(acceptedFiles => {
        setReciveProfile(acceptedFiles)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <>
            <Helmet> <title>Register page</title> </Helmet>

            <form onSubmit={handleSubmit(onSubmit)} className="card mx-auto flex-shrink-0 w-full

max-w-md px-10 py-3 shadow-2xl bg-base-100">

                <div className="form-control  my-2">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text"  {...register("name", { required: true })}
                        placeholder="Enter your full name" className="input input-bordered input-info w-full max-w-xs" />
                    {errors.fullName && <p className="text-red-600">This field is required</p>}
                </div>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="form-control  my-2">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email"  {...register("email", { required: true })}
                        placeholder="Enter your email" className="input input-bordered input-primary w-full max-w-xs" />
                    {errors.email && <p className="text-red-600">This field is required</p>}
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
                                <div className="text-center mt-6 border 
                             animate-pulse  rounded-2xl py-6 hover:cursor-pointer">
                                    <button className="btn-success text-white text-3xl 
                                    rounded-md font-bold">
                                        <MdOutlineFileUpload></MdOutlineFileUpload>
                                    </button>
                                   <BeatLoader className="mx-auto mt-4" color="#19D3AE"></BeatLoader>
                                </div>
                            </>

                            :
                            <>
                                <div className="text-center mt-6 border rounded-2xl py-6 hover:cursor-pointer">
                                    <button className="btn-success text-white text-3xl rounded-md font-bold">
                                        <MdOutlineFileUpload></MdOutlineFileUpload>
                                    </button>
                                    <p className="mt-3">{ reciveProfile  ?
                                    "Your profile file name is "  + reciveProfile[0].name 
                                    : "Drag and drop your profile picture"}</p>
                                </div>
                            </>
                    }
                    {errors.profile && <p className="text-white py-2
                     bg-red-500 rounded-md px-6 my-3">
                        Please drop down your profile image</p>}
                </div>

                {/* drop down maker end  */}

                <div className="form-control my-2">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password"
                        {...register("password", {
                            required: "This password feild is required ",
                            pattern: /[A-Z]/,
                            minLength: {
                                value: 8, message: "Password must be 8 character or longer",
                            }
                        })}

                        placeholder="Enter your password" className="input input-bordered input-primary w-full max-w-xs" />
                    {/* errors will return when field validation fails  */}
                    {errors.password && <p className="text-red-600">Rquired , give one capital latter  and 8 characters  </p>}
                </div>
                <input className="btn btn-weard w-80 my-3" type="submit" value="Register" />

                <p className="text-md font-bold my-4">Have an account ? <NavLink to="/login" className="textColor"> Please login </NavLink> </p>
                <div className="flex flex-col w-full border-opacity-0 textColor">
                    <div className="divider">Or sign in with </div>
                </div>
                <div className="btn  my-2" type="submit"
                    onClick={() => handleGoogleLogin()}
                >Sign in with Google </div>
                <div className="btn my-2" type="submit"
                    onClick={() => handleGithubLogin()}
                >Sign in with Github </div>
            </form>
        </>
    );
}

export default Register;
