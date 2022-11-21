import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { Helmet } from 'react-helmet';
const Profile = () => {
const {user} = useContext(AuthContext) ;
return (
<>
<Helmet>
    <title>Profile page </title>
</Helmet>

<div className="card w-96 bg-base-100 shadow-xl mx-auto my-3">
<figure><img src={user.photoURL ? user.photoURL : "https://i.ibb.co/Pwh4tt1/noimgs.png"}
className="h-72 rounded-full w-72 my-6"
alt="profile" /></figure>
<div className="card-body">
<h2 className="card-title"> Name : {user.displayName ? user.displayName : "name not found"}</h2>
<p className='font-bold text-xl'> Email : {user.email ? user.email : "email not found"} </p>
<p className='text-xl font-bold'>
Email status : {
user.emailVerified ? 
<span className='text-green-400'> Email is verified </span> :
<span className='text-red-400'> Email is not verified </span>         
}</p>
<NavLink to="/edit-profile">
<button className="btn btn-info text-white my-2">Update your profile</button>
</NavLink>
</div>
</div>
</>
);
};

export default Profile;