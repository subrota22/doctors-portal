import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import {Helmet} from "react-helmet";
const EditProfile = () => {

const {updateUserProfile} = useContext(AuthContext) ;
const handlFormData = (event) => {
event.preventDefault() ;
const name = event.target.name.value ;
const profile = event.target.profile.files[0] ;
//convert into react form data 
const formData = new FormData() ;
formData.append("image" , profile) ;

const url = `https://api.imgbb.com/1/upload?key=2225a172ce277ab804ef28ca4715e4e4 ` ;
fetch(url , {
method:"POST" ,
body:formData , 
})
.then(res => res.json())
.then(data =>   
updateUserProfile(name , data.data.display_url)
.then(() => {
toast.success("Welldone your profile is updated") ;
})    
.catch((error) => {
toast.error(error.message) ;
})
)
}

return (
  <>
<Helmet>
    <title>Edit profile</title>
</Helmet>
  <div className="hero">
  <div className="hero-content flex-col">
    <div className="card flex-shrink-0 w-96  h-96 max-w-lg shadow-2xl  bg-base-100">
      <form  className="card-body" onSubmit={handlFormData}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name='name' placeholder="Name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Profile</span>
          </label>
          <input type="file" 
         name='profile'  placeholder="profile" 
          className="file-input file-input-bordered file-input-primary" />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary bgColor"> Update </button>
        </div>
      </form>
    </div>
  </div>
</div></>
    );
};

export default EditProfile;