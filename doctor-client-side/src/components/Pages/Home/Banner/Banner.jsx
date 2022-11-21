import React from 'react';
import chair from "../../../assets/images/chair.png" ;
import chairBackgroundImage from  "../../../assets/images/bg.png" ;
import { Typewriter } from 'react-simple-typewriter'
const Banner = () => {
const  bannerBackground = {
backgroundImage:`url('${chairBackgroundImage}')` ,
backgroundSize:"cover" , 
}
return (
<div className='my-4'>
<div className="hero" style={bannerBackground}>
<div className="hero-content flex-col lg:flex-row-reverse">
<img src={chair} alt='chair' className="max-w-sm rounded-lg shadow-2xl h-[355px]	
w-[594px]" />
<div className='px-20 '>
<h1 className="text-5xl font-bold">
   
    <Typewriter
            words={['Your New Smile ', ' Starts Here', 
            'Your health ', 'Our responsibility ' , 
             `cause 'health is wealth'`
          ]}
            loop={Infinity}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
</h1>
<p className="py-6 text-lg font-bold">
Your dent is our care , we are always here to serve your any dent issues we 
will serve your and dent issue  don't affraid about of your daint cause we are
dainties.Tooth Decay. Tooth decay is also known as dental caries or dental cavities. ...
Gum Disease. Gingivitis is the early stage and mild form of gum or periodontal disease. ...
Bad Breath. ...
Sensitive Teeth. ...
Cracked or Broken Teeth. ...
Receding Gums. ...
Root Infection. ...
Enamel Erosion.
</p>
<button className="border-none py-4 px-4 rounded-xl btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white">Get Started</button>
</div>
</div>
</div>  
</div>
);
};

export default Banner;