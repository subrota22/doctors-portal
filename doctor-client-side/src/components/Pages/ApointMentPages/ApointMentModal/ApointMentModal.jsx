
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../AuthProvider/AuthProvider';
const ApointMentModal = ({reciveTreatMent , date , setTreatMent , refetch }) => {
const {user} = useContext(AuthContext) ;
const { name , price } = reciveTreatMent ; 
const dataCombine = {
name:user.displayName ,
email:user.email ,
service:name , 
date:date ,
price : price , 
}
const [book , setBook] = useState(dataCombine) ;
const handleInputFeild = (event) => {
const feild = event.target.name ;
const value = event.target.value ;
const newBook = {...book} ;
newBook[feild] = value ;
setBook(newBook) ;
}
const hanldeSubmitForm = (event) => {
event.preventDefault() ;
setTreatMent(null) ;
fetch(`https://use-me.vercel.app/bookings` , {
method:"POST" ,
headers:{
'Content-Type' : "application/json" 
} ,
body:JSON.stringify(book) 
})
.then(res => res.json())
.then(data => {
if(data.insertedId){
toast.success("Your apoinment recived successfully !! ") ;
refetch() ;
}else{
toast.error(data.message)
}
})
.catch((error) =>{
console.log(error);
})
}
return (
<div>
<input type="checkbox" id="apointment-modal" className="modal-toggle"  required/>
<div className="modal">
<form onSubmit={hanldeSubmitForm} className="modal-box relative">
<label htmlFor="apointment-modal"  className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
<h3 className="text-lg font-bold text-start">{reciveTreatMent?.name}</h3>
<input type="text"  disabled  defaultValue={date} placeholder="date" className="my-2 input input-primary w-full" required/>
<input type="text" name='email' disabled defaultValue={user?.email}  placeholder="Email" className="my-2 input input-primary w-full" required/>
<input type="text"  name='fullName' disabled  defaultValue={user?.displayName}  placeholder="Full name" className="my-2 input input-primary w-full" required/>
<select name='bookingTime' onChange={handleInputFeild} className="select select-success w-full">

{reciveTreatMent?.slots.length !== 0 } && 
<>
<option disabled> Pick your time </option>
{reciveTreatMent?.slots.map( (slot , index ) =>  <option key={index} value={slot}> {slot} </option> )}
</>
{reciveTreatMent?.slots.length === 0 && <option> All is booked tray another day  </option>  }
</select>
<input type="text" name='phoneNumber'  onChange={handleInputFeild} placeholder="Phone number" className="my-2 input input-primary w-full" required/>
<button className='w-full btn my-2' >submit</button>
</form>
</div>
</div>
);
};
export default ApointMentModal;