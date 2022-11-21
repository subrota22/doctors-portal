import React from 'react';
import watch from "../../../assets/icons/clock.svg" ;
import marker from "../../../assets/icons/marker.svg" ;
import phone from  "../../../assets/icons/phone.svg"
const AddressCard = () => {
const  cards = [
{    
id : 1 ,   
image : watch  , 
title: "Opening Hours" ,
description : "We are working time 9 AM to 8 PM , and if needed than we will stay our office more than this time." ,
background:"bg-gradient-to-r from-cyan-500 to-blue-500" , 
} ,
{    
id:2 ,
image : marker  , 
title: "Visit our location" ,
description : "Find us esily by google map , this is our office address" ,
background:"bg-gradient-to-r from-sky-800 to-cyan-800" , 
}
,
{    
id:3 , 
image : phone  , 
title: "Contact us now" ,
description : "Our phone number is : +8801745123697" ,
background:"bg-gradient-to-r from-cyan-500 to-blue-500" , 
}
]
return (
<div className='ml-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
{
cards.map(card =>                    
<div className={`card card-side px-4 py-2 text-white shadow-xl mx-2 my-12 ${card.background}`}   key={card.id}>
<figure><img src={card.image} alt="card"/></figure>
<div className="card-body">
<h2 className="card-title">{card.title}</h2>
<p>{card.description}</p>
</div>
</div>
)
}
</div>
);
};
export default AddressCard;