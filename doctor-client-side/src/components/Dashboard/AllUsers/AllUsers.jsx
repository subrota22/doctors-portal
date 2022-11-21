import React, { useState }  from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet';
import ConfrimModal from '../../Share/ConfirmModal/ConfrimModal';
const AllUsers = () => {
const [ deleteUser , setDeleteUser] = useState(true) ;
const {data:usersData  = [] , refetch} = useQuery({
queryKey: ['users'],
queryFn: async ()  => {
const res  = await fetch(`https://use-me.vercel.app/users/` , {
    method:"GET" , 
      headers:{
        authorization:`Bearer ${localStorage.getItem("doctors-portal")}`
        }
}) ;
const data = await res.json() ;
return data ; 
}
} )


//make an admin
const makeAdmin = (id) => {
fetch(`https://use-me.vercel.app/users/admin/${id}`, {
method:"PUT" ,
headers:{
authorization:`Bearer ${localStorage.getItem("doctors-portal")}`
}
})
.then(res => {
if(res.status === 403 ) {
return toast.error("Forbidden access") ;
}
return res.json()
})
.then(data => {
if(data.result.modifiedCount > 0 ){
toast.success(data.message) ;
refetch() ;
}
})
.catch(error => console.log(error))
}
//delete user
const handleUserDelete = (data) => {
fetch(`https://use-me.vercel.app/users/${data._id}` , {
    method:"DELETE" ,
    headers:{
        authorization:`Bearer ${localStorage.getItem("doctors-portal")}`
    }
})
.then(res => res.json())
.then(data => {
if(data.deletedCount > 0) {
toast.success("User deleted successfull!!") ;
refetch() ;
setDeleteUser(false) ;
}
})
.catch(error => console.log(error))
}
//
const closeModal = () => {
setDeleteUser(false) ;
}
return (
    <>
    <Helmet><title>All users </title></Helmet>

<div>
<h2 className='text-2xl font-bold my-2 text-green-500'> Our all users </h2>
<div className="overflow-x-auto">
<table className="table w-full">
<thead className=" text-info">
<tr> 
<th>Serial</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Create admin</th>
<th>Delete</th>
<th>Update</th>
</tr>
</thead>
<tbody>
{
usersData.map( (user , serial) =>  
<tr  className="hover" key={user._id}>
<th>{serial+1}</th>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.role ? user.role : "user"}</td>
<td>
{
!user.role  && 
<button className="btn btn-success btn-xs text-white"
onClick={() => makeAdmin(user._id)}>Make admin </button>
}

{
user.role === 'admin' &&
<button className="btn btn-success btn-xs text-white">  Admin </button>    
}

{
user.role === 'moderator' &&
<button className="btn btn-success btn-xs text-white">  Moderator </button>    
}


</td>
<td>
     <label htmlFor="confirmModal" 
     onClick={()=>setDeleteUser(user)}
     className="btn btn-error btn-xs text-white bg-red-600">Delete</label>
</td>
<td>
<NavLink to={`/dashboard/update-user-information/${user._id}`}>
<button className="btn btn-success text-white  btn-xs">Update</button>
</NavLink>
</td>
</tr>
)

}
</tbody>
</table>
</div>
</div>
{
deleteUser &&     
<ConfrimModal
title="You can not recover this data !! "
text="Are you want to delete this data" 
closeModal={closeModal}
handleDelete={handleUserDelete}
modalData = {deleteUser} 
></ConfrimModal>}
</>
);
};

export default AllUsers;