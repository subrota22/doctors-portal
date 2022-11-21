import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateUser = () => {
    const userData = useLoaderData() ;
  //
  const [updateUser  , setUpdateUser] = useState(userData) ;
  const navigate = useNavigate() ;
  const handleSubmit = (event) => {
  event.preventDefault() ;
  fetch(`https://use-me.vercel.app/users/${userData._id}` , {
    method:"PUT", 
    headers:{
    'content-type' : 'application/json' ,
    authorization:`Bearer ${localStorage.getItem("doctors-portal")}`
    } ,
    body:JSON.stringify(updateUser) , 
  })
  .then(res => res.json()) 
  .then(data => {
navigate ("/dashboard/all-users") ;
  if(data.acknowledged) {
  return toast.success("User data updated successfully !!")
  }
  })
  .catch(error => console.log(error))
  }

const handleInputFeild = (event) => {
const feild = event.target.name ;
const value = event.target.value  ;
const newUpdateData = {...updateUser} ;
newUpdateData[feild] = value ;
setUpdateUser(newUpdateData) ;
  }
    return (
        <div>
<div className="hero">
  <div className="hero-content">
    <div className="card h-auto shadow-2xl bg-base-100 w-full">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" defaultValue={userData.name}  name="name"
         onChange={handleInputFeild}   placeholder="Name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" defaultValue={userData.email} name="email"
        onChange={handleInputFeild}  placeholder="email" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <input type="text" defaultValue={userData.role} name="role"
        onChange={handleInputFeild}  placeholder="role" className="input input-bordered" />
        </div>


        <div className="form-control mt-6">
          <button className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default UpdateUser;