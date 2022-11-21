import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';
import Helmet from "react-helmet" ;
import ConfrimModal from '../../../Share/ConfirmModal/ConfrimModal';
import {toast} from "react-toastify" ;
import {NavLink, useNavigate} from "react-router-dom" ;
import { MdEdit } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
const ManageDoctors = () => {
const [deletingDoctor , setDeletingDoctor ] = useState(null) ;
const navigate = useNavigate() ;
const {data:doctors , isLoading , refetch  }  = useQuery({
queryKey:['doctors'] ,
queryFn : async ()  => fetch(`https://use-me.vercel.app/doctors` , {
  headers:{
    authorization : `Bearer ${localStorage.getItem("doctors-portal")}`
    } , 
}) 
.then(res => {
if(res.status === 403 || res.status === 401){
toast.error("Forbidden access") ;
navigate("/dashboard")
}
return res.json() ;
})
.then(data => data ) 
.catch(error => console.log(error))
}) 

const closeModal  = () => {
setDeletingDoctor(null) ;
}
// delete doctors data //
const handleDelete = (doctor) => {
fetch(`https://use-me.vercel.app/doctors/${doctor._id}` , {
method:"DELETE" , 
headers:{
authorization : `Bearer ${localStorage.getItem("doctors-portal")}`
} , 
})
.then(res =>
  {
    if(res.status === 403 || res.status === 401){
      toast.error("Forbidden access") ;
      navigate("/dashboard")
      }
      return res.json() ;
  }
  )
.then(data => {
  if(data.deletedCount > 0 ){
    refetch()
   toast.success("Doctor data deleted successfully") ;
   setDeletingDoctor(null) ;
  }
})
}


if (isLoading) {
  return (
      <>
          <HashLoader color="#19D3AE" style={{margin:"15% 45%"}}></HashLoader>
      </>
  )
}

return (
    <>
    <Helmet>
      <title>Manage doctors</title>
    </Helmet>
    <div>
<h2 className='font-bold text-2xl my-2'> Mange doctors {doctors.length} </h2>

<div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th></th>
        <th>Avatar</th>
        <th>Name</th>
        <th>Email</th>
        <th>Specialty </th>
        <th colSpan="2">Action </th>
      </tr>
    </thead>
    <tbody>

     {
   doctors.map((doctor , serial) => 
    <tr key={doctor?._id}>
    <td>{serial + 1 } </td>
    <td>
  <div className="avatar">
  <div className="w-24 rounded-full">
    <img src={doctor?.doctorProfile}  alt={doctor?.doctorName}/>
  </div>
  </div> 
     </td>
    <td>{doctor?.doctorName}</td>
     <td>{doctor?.doctorEmail}</td>
     <td>{doctor?.specialty}</td>
     <td> 
     <label htmlFor="confirmModal" 
      onClick={()=>setDeletingDoctor(doctor)}>
        <AiTwotoneDelete className='text-2xl font-bold text-red-600 hover:cursor-pointer'></AiTwotoneDelete>
      </label>

      </td>
      <td> 
  <NavLink to={`/dashboard/update-doctor/${doctor._id}`}>
  <MdEdit className='text-2xl font-bold '></MdEdit>
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
deletingDoctor  &&
<ConfrimModal
title={`Are you want to delete doctor ${deletingDoctor.doctorName} ?`}
text={"If you delete this data you can not recover it !! "}
deletingDoctor={deletingDoctor}
closeModal = {closeModal}
handleDelete={handleDelete} 
modalData ={deletingDoctor}
></ConfrimModal>
}
    </>
    );
};

export default ManageDoctors;