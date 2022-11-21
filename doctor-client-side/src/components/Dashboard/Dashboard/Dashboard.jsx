import { format } from 'date-fns';
import React, { useContext } from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
const Dashboard = () => {
const [apoinments , setApointments] = useState([]) ;
const {user , setUser , singOutUser} = useContext(AuthContext) ;
const navigate = useNavigate() ;
//get data 
React.useEffect(() => {
if(!user?.email) return ; 
fetch(`https://use-me.vercel.app/bookings/${user.email}` , {
method:"GET" ,
headers:{
authorization: `Bearer ${localStorage.getItem("doctors-portal")} `  
} 
}).then(res => {
if(res.status === 403 || res.status === 401) {
navigate("/") ;
singOutUser() ;
return toast.warning("token expired") ;
}
return res.json() ;
})
.then(data => setApointments(data)) 
.catch(error => console.log(error))
}, [user.email , setUser , navigate , singOutUser]);
//
    return (
    <>
    <div className='bg-gray-600 h-full py-10 px-6 rounded-md w-full'>
     <div className="flex justify-between">
     <h2 className='mx-2 my-4 text-2xl font-bold'>My Apointment </h2>
     <div className="btn btn-success text-white"> { format(new Date() , "PP") } </div>
     </div>

      <div className="overflow-x-auto">
        {
    apoinments.length === 0 && 
    <h2 className='text-2xl text-white text-center my-6 font-bold'> No apointment available here  </h2>

  }
  
  <table className="table w-full px-12 ">
    <thead>
      <tr  className="hover">
         <th>Serial</th>
        <th>Name</th>
        <th> Email  </th>
        <th>Service</th>
        <th> Time  </th>
        <th colSpan="2"> Payment </th>
      </tr>
    </thead>
    <tbody>


  {
    apoinments.map((booking , serial ) => 
    
        <tr key={booking._id}  className="hover">
        <th>{serial+1}</th>
        <th>{booking.name}</th>
        <td> {booking.email} </td>
        <td> {booking.service}</td>
        <td>{booking.bookingTime}</td>
        <td> <strong>${booking.price ? booking.price : "00"}</strong> </td>
        <td>
        <NavLink to={`/dashboard/payment/${booking._id}`}>
       {
           booking.price && !booking.paid ?
             <button className="btn btn-primary btn-sm text-white">Pay</button> :
           <button className="btn btn-success btn-sm text-white">Paid</button> 
          }
       </NavLink>
        </td>
      </tr>    
    )
  }
    </tbody>
  </table>
</div>
    </div>
  </>
    );
};

export default Dashboard;