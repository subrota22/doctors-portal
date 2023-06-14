import React from 'react';
import apointment from "../../../assets/images/appointment.png";
const ContactForm = () => {
  const contactFormStyle = {
    backgroundImage: `url('${apointment}')`,
    backgroundSize: "cover",
  }
  return (
    <>
      <div className='my-12' id='contact' data-aos="zoom-in">
        <div className="hero min-h-screen">
          <div className="hero-content w-full" style={contactFormStyle}>
            <div className="card flex-shrink-0" style={{ width: "60%" }} >
              <div className="card-body ">
                <p className='text-emerald-500 font-bold text-lg '>Contact Us</p>
                <h2 className='font-bold text-2xl text-white'> Stay connected with us </h2>
                <form action="https://formsubmit.co/itinfobd24@gmail.com" method="post">
                  <div className="form-control">
                    <label className="label ">
                      <span className="label-text text-white">Email</span>
                    </label>
                    <input type="text" placeholder="Email" name='email' className="input input-bordered" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Subject</span>
                    </label>
                    <input type="text" placeholder="Subject" name='subject' className="input input-bordered" />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Message</span>
                    </label>
                    <textarea placeholder="Your Message" name='message' rows="6" className="textarea textarea-primary" />
                  </div>
                  <div className="form-control mt-6">
                    <button className="border-none py-4 px-4 rounded-xl btn bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ContactForm;