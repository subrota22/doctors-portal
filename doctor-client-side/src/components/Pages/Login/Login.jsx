import React from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import {  useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import authToken from "../../authToken/authToken";
const Login = () =>  {
const {signInUser  , signInWithGoogle , signInWithGithub} = useContext(AuthContext) ;
const location = useLocation() ;
const from = location?.state?.from?.pathname || '/' ;
const navigate = useNavigate() ;
const {
register,
handleSubmit,
formState: { errors }
} = useForm();
const onSubmit = (data) => {
signInUser(data.email , data.password)
.then((result) => {
toast.success("Welcome " + result.user.displayName + " thanks to connected with us .") ;
navigate(from , {replace:true}) ;
authToken(result.user.email)
})
.catch(error =>{
toast.warning(error.message)
})
}; 
//google log in 
const handleGoogleLogin  = () => {
signInWithGoogle()
.then((result) => {

  toast.success("Your are login successfully by Google") ;
  authToken(result.user.email)


})
.catch(error => toast.error(error.message))
}
//google log in 
const handleGithubLogin  = () => {
signInWithGithub()
.then((result) => {
  toast.success("Your are login successfully by Github") ;
 console.log(result.user.email);
authToken(result.user.email)

})
.catch(error => toast.error(error.message))
}
return (
  <>
  <Helmet>
    <title>Login page</title>
  </Helmet>
<form onSubmit={handleSubmit(onSubmit)} className="card mx-auto my-4 flex-shrink-0 w-full max-w-sm px-10 py-3 shadow-2xl bg-base-100">
<div className="form-control  my-2">
<label className="label">
<span className="label-text">Email</span>
</label>
<input type="email"  name="email" {...register("email", { required: true })}  placeholder="Enter your email" className="input input-bordered input-primary w-full max-w-xs" />
{errors.email && <p className="text-red-600">This field is required</p>}
</div>

<div className="form-control my-2">
<label className="label">
<span className="label-text">Password</span>
</label>
<input type="password"  name="password"
{...register("password", {
required : "This password feild is required " ,  
pattern: /[A-Z]/  , 
minLength:{value: 8 , message:"Password must be 8 character or longer" ,
}
})} 
placeholder="Enter your password" className="input input-bordered input-primary w-full max-w-xs" />
<NavLink to="/reset-password" className="my-2 mx-2">Forgot password ? </NavLink>
{/* errors will return when field validation fails  */}
{errors.password && <p className="text-red-600">Rquired , give one capital latter  and 8 characters  </p>}
</div>
<input className="btn w-80  my-2" value="Login"  type="submit"/>

<div className="flex flex-col w-full border-opacity-0 textColor">
  <div className="divider">Or sign in with </div>
</div>
<div className="btn  my-2" type="submit" 
onClick={() => handleGoogleLogin()}
>Sign in with Google </div>
<div className="btn my-2" type="submit"
onClick={() => handleGithubLogin()}
>Sign in with Github </div>
<p className="text-md font-bold mt-2">New to Doctors Portal? <NavLink to="/register" className="textColor">Create an account </NavLink> </p>
</form>
</>
);
}

export default Login ;
