import React from 'react';
import people1 from "../../../assets/images/people1.png" ; 
import people2 from "../../../assets/images/people2.png" ; 
import people3 from "../../../assets/images/people3.png" ; 
import quote from "../../../assets/icons/quote.svg" ;
const Testimonal = () => {
const  cards = [
{    
id : 1 ,   
image : people1  , 
address : "California" , 
name: "Winson Herry" ,
description : "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content" ,
} ,
{    
id : 2 ,   
image : people2  , 
address : "California" , 
name: "Winson Herry" ,
description : "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content" ,
} ,

{    
id : 3 ,   
image : people3  , 
address : "California" , 
name: "Winson Herry" ,
description : "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content" ,
} ,
]
return (
<div className='mx-auto justify-center text-center textColor'>
<div className="flex justify-between mx-3">
<div className='mt-6'>       
<p className='text-emerald-500 font-bold text-lg'>Testimonial</p>
<h1 className='text-4xl font-bold '>What Our Patients Says</h1>
</div>
<div>
<img src={quote} alt="queties" className='h-20 md:h-40 '/>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-3">
{
cards.map(card => 
<div  data-aos="zoom-in" className="card w-96 my-3 shadow-xl text-primary-content textColor" key={card.id}>
<div className="card-body">
<h2 className="card-text">{card.description}</h2>
<div className="flex my-4">
<div className="avatar">
<div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
<img src={card.image} alt='patinet profile'/>
</div>
<div className='ml-4'>
<p className='mt-6'> {card.name} </p>
<p> {card.address} </p>
</div>
</div>
</div>
</div>
</div>
)
}
</div>

</div>
);
};

export default Testimonal;