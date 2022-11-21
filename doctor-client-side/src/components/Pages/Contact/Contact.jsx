import React from 'react';
import  Helmet  from  "react-helmet";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
     fetch(`https://use-me.vercel.app/sendMail` , {
        method:"POST" ,
        headers:{
        'Content-Type' : 'application/json'
        } ,
        body:JSON.stringify(data)
     })
     .then(res => res.json())
     .then(data => {
     if(data.sended){
        toast.success("You are success to send mail ") ;
     }
     })
     .catch((error) => {
        console.log(error);
     })
    }
    return (
        <>
            <Helmet>
                <title>Contact form </title>
            </Helmet>


    <div className="card mx-auto" style={{width:"66%"}}>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email to : </span>
          </label>
          <input type="text"  {...register("to" , {
            required:true , 
          })}
           placeholder=" like email@gmail.com " className="input input-bordered" />
         {errors.to && <span className='bg-error p-4 text-white my-2 rounded-md'>This field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Subject : </span>
          </label>
          <input type="text" {...register("subject" , {
            required:true , 
          })}
           placeholder="subject text" className="input input-bordered" />
            {errors.subject && <span className='bg-error p-4 text-white my-2 rounded-md'>This field is required</span>}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Message : </span>
          </label>
          <textarea rows="6" type="text" {...register("message" , {
            required:true , 
          })}
           placeholder="Enter your message" className="textarea textarea-bordered" />
         {errors.message && <span className='bg-error p-4 text-white my-2 rounded-md'>This field is required</span>}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Send message </button>
        </div>
      </form>
      </div>

</>
    );
};

export default Contact;