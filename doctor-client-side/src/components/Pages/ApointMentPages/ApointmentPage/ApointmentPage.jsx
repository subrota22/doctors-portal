import React from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import chair from "../../../assets/images/chair.png"
import { useState } from 'react';
import ApointMentModal from '../ApointMentModal/ApointMentModal';
import bg from "../../../assets/images/bg.png" ;
import {Helmet} from "react-helmet";
import { useQuery } from '@tanstack/react-query';
import PageLoader from '../../../Share/PageLoader/PageLoader';
const ApointmentPage = () => {
const [selectedDate, setSelectedDate] = React.useState(new Date());
const [reciveTreatMent , setTreatMent] = useState(null) ;
let footer = <p>Please pick a day.</p>;
if (selectedDate) {
footer = <p>Available apointments on {format(selectedDate, 'PP')}.</p>;
}
const date = format(selectedDate , "PP") ;

const backgroudStyle = {
backgroundImage:`url('${bg}')` ,
backgroundPosition:"center" ,
backgroundSize : "cover" , 
}

const {data:appointmentOptions = [] , refetch , isLoading } = useQuery({
queryKey: ['appointmentOptions' , date],
queryFn: async () => 
fetch(`https://use-me.vercel.app/v2/appointmentOptions?date=${date}`) 
.then(res => res.json()) 
 })
if(isLoading){
return <PageLoader></PageLoader>
}
return (
<React.Fragment>
<Helmet>
  <title>Apointments</title>
</Helmet>
<div className="hero" style={backgroudStyle} >
<div className="hero-content flex-col lg:flex-row-reverse justify-between">
<div className='ml-6 md:ml-28'>
<img src={chair} alt='chair' className=" max-w-sm md:max-w-lg rounded-lg shadow-md"/>
</div>
<div>
<DayPicker
mode="single"
selected={selectedDate}
onSelect={setSelectedDate}
/>
</div>
</div>
</div>
<h2 className='text-center textColor text-xl my-6 font-bold'>{footer}</h2>
<div className="apointmentCard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2">
{
appointmentOptions?.map(service => 
<div className="card w-full shadow-2xl text-center text-primary-content" key={service._id}>
<div className="card-body text-green-600">
<h2 className="card-title textColor font-bold pl-20">{service.name}</h2>
<p>{service.slots.length > 0 ? service.slots[0] : "No time available tray next day"}</p>
<p>{service.slots.length} {service.slots.length > 1 ? "SPACES" : "SPACE"} AVAILABLE</p>
<p>Treatment price : <strong>${service.price}</strong> </p>
<div className="card-actions justify-center">
<label htmlFor="apointment-modal" disabled = {service.slots.length === 0 }
onClick={() => setTreatMent(service ) +  refetch}
className="btn btn-primary bgColor text-white">
Book Appointment
</label>
</div>
</div>
</div>
)}
</div>
{
  reciveTreatMent &&
  <ApointMentModal
 reciveTreatMent={reciveTreatMent}
 date={date}
 setTreatMent = {setTreatMent}
 refetch ={refetch}
 ></ApointMentModal>

}
</React.Fragment>
)};

export default ApointmentPage;