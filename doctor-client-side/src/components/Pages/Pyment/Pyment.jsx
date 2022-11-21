import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../PaymentPages/CheckoutForm/CheckoutForm';

const Pyment = () => {
  const data = useLoaderData();
  const pk = process.env.REACT_APP_STRIPE_PK;
  const stripePromise = loadStripe(pk);
  return (
    <>
      <Helmet>
        <title>Checkout page </title>
      </Helmet>
      <div className='bg-gradient-to-r from-sky-500 to-indigo-500 h-screen 
     rounded-md pt-4'>
      <div className='text-center font-bold text-xl 
text-white py-6 rounded-sm'>
        <p> Please pay for <span className="text-sky-800"> {data.service}</span></p>
        <p> Treatment Price : <strong> $  {data.price ? data.price : "00"} </strong> </p>
        <p> Booking time : {data.bookingTime}</p>
        <p> Booking date : {data.date}</p>
      </div>
  <div className='w-96 h-auto mx-auto bg-yellow-400
text-white py-16 px-2 rounded-xl '>
        <Elements stripe={stripePromise}>
          <CheckoutForm data={data} />
        </Elements>
      </div>
  </div>
    </>
  );
};

export default Pyment;