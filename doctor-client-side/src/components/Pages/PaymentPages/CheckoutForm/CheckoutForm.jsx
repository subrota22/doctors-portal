import React, { useState } from 'react';
import {CardElement , useStripe , useElements} from "@stripe/react-stripe-js" ;
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useNavigation } from  "react-router-dom";
const CheckoutForm = ({data}) => {
    const { price , name , email, _id  } = data ;
     const [processing , setProcessing] = useState(false) ;
    const stripe = useStripe();
    const controlLoading = useNavigation() ;
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("") ;
    const [userPaymentId , setUserPaymentId] = useState('') ;
    if(controlLoading.state === "loading") {
      return <ClipLoader color='blue'/>
    }
    const dataPost = {
      price:price ? price : "00" , 
    }
    const saveToTheDatabase = {
      name:name ,
      email:email ,
      price:price ,
      transactionId : userPaymentId , 
      bookingId : _id ,  
    }
    const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true) ;
  fetch(`https://use-me.vercel.app/createPaymentIntent`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"  ,
      authorization: `Bearer ${localStorage.getItem("doctors-portal")}` , 
    },
    body: JSON.stringify(dataPost),
  })
    .then((res) =>  res.json() )
    .then((data) => {
    setProcessing(false) ;
    console.log(data?.clientSecret);
    return setClientSecret( data?.clientSecret )  ;
    });

//saveToTheDatabase

if(clientSecret){
  fetch("https://use-me.vercel.app/payments" , {
  method: "POST",
headers: { 
  "Content-Type": "application/json"  ,
  authorization: `Bearer ${localStorage.getItem("doctors-portal")}` , 
},
body: JSON.stringify(saveToTheDatabase),
})
.then((res) => res.json())
.then((data) => console.log(data));
}
    //
        if (!stripe || !elements) {
          return; 
        }
    
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
        const {error} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          toast.error(error.message , {
            position:"bottom-right"
          })
        }

const {paymentIntent , confirmError } = await stripe.confirmCardPayment( clientSecret , {
    payment_method: {
      card: card,
      billing_details: {
        name: name,
        email:email , 
      },
    },
  }) 

if(confirmError){
  toast.error(confirmError.message) ;
  return ;
}
if(paymentIntent.status === "succeeded") {
toast.success("Congratulation you have been paid successfully" , {
  position:"top-center" ,  
})
setUserPaymentId(paymentIntent.id) ;
// setProcessing(false)
} 


  };




    return (
        <>
       <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
{

        <button type="submit" className='btn btn-success text-white 
      mt-12 w-80' disabled={!stripe}>
       {
       !userPaymentId ?  processing ? <ClipLoader color="white" /> :  " Pay" :  undefined
       }
       {
        userPaymentId && "Paid"
       }
      </button>
 
}
{
  userPaymentId && <p className='text-white font-bold my-2'>Your payment id : {userPaymentId}</p>}
    </form>
        </>
    );
};

export default CheckoutForm;