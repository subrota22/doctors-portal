import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const ForgotPassword = () => {
const {resetPassword} = useContext(AuthContext) ;
const handleInputFeild = (event) => {
    event.preventDefault() ;
    const email = event.target.email.value ;
    resetPassword(email)
    .then(() => {
     toast.success("Please check your inbox or spam to reset your emal !! ") ;
    }).catch((error)=>{
    toast.error(error.message) ;
    })
}
    return (
        <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <form  className="card-body" onSubmit={handleInputFeild}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email"
                 name='email'
                className="input input-bordered" />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary text-white">Send request</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default ForgotPassword;