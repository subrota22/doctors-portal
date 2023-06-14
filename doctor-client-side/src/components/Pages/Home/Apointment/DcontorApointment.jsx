import React from 'react';
import doctor from "../../../assets/images/doctor-small.png" ;
import appointment from "../../../assets/images/appointment.png"
const DcontorApointment = () => {
 const doctorApointMentStyle = {
  backgroundImage:`url('${appointment}')` ,
  backgroundSize : "cover" , 
 }
  return (
<div className='mb-6 mt-16'  data-aos="zoom-in">
 <div className="hero h-[555px]" style={doctorApointMentStyle}>
  <div className="hero-content flex-col lg:flex-row">
    <img src={doctor} alt='denties doctor' className="max-w-sm -mb-[41px]
     rounded-md w-0 h-[646px] md:w-[620px] -mt-32 hidden lg:block" />
    <div  data-aos="zoom-in">
     <p className='text-emerald-500 text-lg font-bolg my-5'>Appointment</p>
      <h1 className="text-5xl text-white font-bold">Make an appointment Today</h1>
      <p className="py-6 text-lg text-white">
      It is a long established fact that a reader will be distracted by the 
      readable content of a page when looking at its layout. The point of using 
      Lorem Ipsumis that it has a more-or-less normal distribution of letters,as
       opposed to using 'Content here, content here', making it look like readable 
       English.Many desktop publishing packages and web page 
      </p>
<button className="border-none py-4 px-4 rounded-xl btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white">Get Started</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default DcontorApointment;