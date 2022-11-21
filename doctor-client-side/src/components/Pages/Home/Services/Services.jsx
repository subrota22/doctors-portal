import React from 'react';
import fluoride from "../../../assets/images/fluoride.png" ;
import cavity from "../../../assets/images/cavity.png" ;
import whitening from  "../../../assets/images/whitening.png" ;
import treatment from "../../../assets/images/treatment.png" ;
const Services = () => { 
const  cards = [
{    
id : 1 ,   
image : fluoride  , 
title: "Fluoride Treatment" ,
description : "Fluoride varnish can be applied to both baby teeth and adult teeth by a dentist. The process involves painting a varnish containing high levels of fluoride onto the surface of the tooth twice a year to prevent decay. It works by strengthening tooth enamel, making it more resistant to decay." ,
} ,
{    
id:2 ,
image : cavity  , 
title: "Cavity Filling" ,
description : "Amalgam Fillings: Amalgam has been used by dental professionals for more than a century; it is the most researched material used for filling cavities." ,
}
,
{    
id:3 , 
image : whitening  , 
title: "Teeth Whitening" ,
description : "Tooth whitening or tooth bleaching is the process of lightening the color of human teeth.Whitening is often desirable when teeth become yellowed over time" ,
}
]
return (
<>
<div className="my-3">
<div className="text-center font-bold">
<h2  className='text-xl text-success'>Our services</h2>
<h2 className='text-3xl text-gray-800'>Services We Provide</h2>
</div>
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
{
cards.map(card =>                    
<div className={`card  flex flex-col px-4 py-2 text-gray-800
 shadow-xl mx-2 my-12 bg-base-400 textColor`}   key={card.id}>
<figure><img src={card.image} alt="card" className='mx-auto'/></figure>
<div className="card-body mx-auto">
<h2 className="card-title ml-14">{card.title}</h2>
<p className='pl-12'>
{
 card.description.length > 110 ? 
 card.description.slice(0  , 100) + "..." :
  card.description}</p>
</div>
</div>
)
}
</div>
</div>

<div className="hero min-h-screen my-3">
  <div className="hero-content flex-col lg:flex-row">
    <img src={treatment} alt='treatment' className="max-w-sm rounded-lg shadow-2xl" />
    <div className='px-32'>
      <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
      <p className="py-6">
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page
      </p>  
<button className="border-none py-4 px-4 rounded-xl btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white">Get Started</button>
    </div>
  </div>
</div>

</>
);
};
export default Services;