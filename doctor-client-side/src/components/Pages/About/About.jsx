import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Typewriter } from 'react-simple-typewriter';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const About = () => {
    //isLoading , error , data 
    // you can change the query params by option like data:doctors
    const { isLoading, error, data: doctors } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://use-me.vercel.app/doctors', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("doctors-portal")}`
                }
            }).then(res =>
                res.json()
            )
    })

    if (isLoading) return <>
        <div style={{ margin: "8% 20%" }}>
            <ClipLoader color="blue" className='mx-96 my-36'></ClipLoader>
        </div>
    </>

    if (error) return toast.error('An error has occurred: ' + error.message)
    //
    console.log(doctors);


    if (isLoading) {
        return (
            <>
                <ClipLoader style={{ margin: "15% 50%" }} color='blue'></ClipLoader>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>About page </title>
            </Helmet>
            <h2 className='text-3xl font-bold text-center text-info my-6'>
            
         <Typewriter
            words={['Your New Smile ', ' Starts Here', 'Our all doctors' ]}
            loop={Infinity}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
                  </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-2">

                {
                    doctors.map(doctor =>
                        <div className="card w-96 bg-base-100 shadow-xl text-indigo-600">
                            <figure><img src={doctor.doctorProfile} className="w-full h-72" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Specialty {doctor.specialty}</h2>
                                <h2 className="card-title">Email {doctor.doctorEmail}</h2>
                                <h2 className="card-title">Name {doctor.doctorName}</h2>
                            </div>
                        </div>
                    )}


            </div>
        </>
    );
};

export default About;