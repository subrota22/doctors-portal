

import React from "react";

const About = () => {
    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
            <div className="lg:w-10/12 w-full">
                <h2 className="xl:w-8/12 lg:w-10/12 w-full font-bold  lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">Patient bed</h2>
                <p className="font-normal text-base leading-6  mt-6">
  A patient bed, also known as a hospital bed or medical bed, is a specialized piece of furniture designed for patients in medical facilities or home healthcare settings. Here are some details about patient beds:

Types: There are various types of patient beds available, depending on the specific needs and requirements of the patient and the healthcare setting. These include standard hospital beds, adjustable beds, intensive care unit (ICU) beds, pediatric beds, and bariatric beds designed for heavier individuals.

Construction: Patient beds typically consist of a sturdy frame made of metal or high-strength materials. The frame is usually equipped with adjustable features that allow for changes in height, head and foot positioning, and sometimes side railings for patient safety.

Mattress: Patient beds are usually equipped with mattresses designed to provide comfort and support for the patient. These mattresses may vary in thickness, firmness, and material composition, depending on the specific needs of the patient and the healthcare facility's standards.

Adjustable Features: Many patient beds have motorized or manual controls that allow for adjusting the height, raising or lowering the head or foot sections, and tilting the bed to various positions. These adjustable features help improve patient comfort, facilitate caregiving tasks, and assist with medical procedures.

Safety Features: Patient beds often have built-in safety features to prevent falls and injuries. These can include side railings that can be raised or lowered, brakes or locking mechanisms on the wheels to secure the bed in place, and alarms to alert healthcare providers if the patient attempts to exit the bed.

Accessories: Patient beds can be equipped with various accessories to enhance patient comfort and facilitate care. These may include bedside tables, IV poles, overbed tables, trapeze bars for patient mobility, and patient lifting systems for transferring patients safely.

Homecare Beds: In addition to hospital settings, patient beds are also available for home use in situations where individuals require long-term medical care or assistance. Homecare beds often have similar features to hospital beds but may be designed to fit within a home environment more seamlessly.

It's important to note that patient beds are designed to meet specific healthcare standards and regulations to ensure patient safety and comfort. The features and specifications of patient beds may vary depending on the manufacturer, healthcare facility requirements, and the specific needs of the patients being cared for.
                </p>
            </div>

            <div className="lg:mt-14 sm:mt-10 mt-12">
            <div class="sketchfab-embed-wrapper">
             <iframe title="Hospital Bed" frameborder="0" height={400} style={{width:"100%"}} allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/03df7ef3e6b6457c9d2846299e512cdf/embed"> </iframe>
             </div>
            </div>

            <div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
                <div className="w-full xl:w-5/12 lg:w-6/12">
                    <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 ">Our Story</h2>
                    <p className="font-normal text-base leading-6  mt-4">
                    Are you looking for reliable and experienced doctors to meet your healthcare needs? Look no further! Our team of highly skilled and dedicated doctors is here to provide comprehensive medical care and personalized treatment.

General Practitioners (GPs): Our GPs are trained in providing primary care for patients of all ages. They are well-versed in diagnosing and treating various illnesses, managing chronic conditions, and promoting preventive care. With their compassionate approach and expertise, our GPs ensure that you receive the best possible care.

Specialists: We also have a diverse range of specialists who cater to specific medical needs. Our specialists include pediatricians, internists, obstetricians/gynecologists, cardiologists, dermatologists, orthopedic surgeons, neurologists, psychiatrists, ophthalmologists, and many more. Each specialist brings their unique skills and knowledge to deliver specialized care tailored to your individual requirements.

Cutting-Edge Technology: Our medical facilities are equipped with state-of-the-art equipment and technology to aid accurate diagnoses and effective treatments. From advanced imaging machines to modern surgical tools, we ensure that our doctors have access to the latest medical advancements, enabling them to provide you with the highest standard of care.

Compassionate Care: At our practice, we understand the importance of compassionate care. Our doctors prioritize patient well-being and take the time to listen, understand, and address your concerns. They believe in building strong doctor-patient relationships based on trust, respect, and open communication.

Continuity of Care: We strive to provide continuity of care by maintaining comprehensive medical records and collaborating closely with other healthcare professionals involved in your treatment. Our doctors work in coordination with specialists, nurses, and allied healthcare staff to ensure seamless and holistic care throughout your medical journey.

Convenient Appointments: We offer flexible scheduling options and strive to accommodate your appointments at your convenience. Whether you need a routine check-up, consultation, or follow-up visit, our friendly staff will assist you in finding the most suitable appointment time.

We are committed to delivering excellent healthcare services with a patient-centered approach. Our team of dedicated doctors is here to guide you through your medical concerns and help you achieve optimal health and well-being. Contact us today to schedule an appointment and experience the difference our doctors can make in your life.

Feel free to modify and customize the text according to your specific requirements and the services offered by your doctors.
                    </p>
                    
                </div>
                <div className=" ">
                    <img className="lg:block hidden w-full" src="https://i.ibb.co/2kxWpNm/Group-740.png" alt="people discussing on board" />
                </div>
            </div>

            <div class="sketchfab-embed-wrapper my-5 mx-2">
                <h2 className="text-5xl font-bolder text-blue-800 my-4">  Our specialist can go your home if it is immergency!!</h2>
                 <iframe title="DAE Diorama - By the ocea0n" style={{width:"100%", height:"500px", borderRadius:"20px"}} frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/5cdcadc2b148428d8c9cbde29ad93279/embed"> </iframe>
           </div>

        </div>
    );
};

export default About;























// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import { Helmet } from 'react-helmet';
// import { Typewriter } from 'react-simple-typewriter';
// import { ClipLoader } from 'react-spinners';
// import { toast } from 'react-toastify';

// const About = () => {
//     //isLoading , error , data 
//     // you can change the query params by option like data:doctors
//     const { isLoading, error, data: doctors } = useQuery({
//         queryKey: ['repoData'],
//         queryFn: () =>
//             fetch('https://use-me.vercel.app/doctors', {
//                 headers: {
//                     authorization: `Bearer ${localStorage.getItem("doctors-portal")}`
//                 }
//             }).then(res =>
//                 res.json()
//             )
//     })

//     if (isLoading) return <>
//         <div style={{ margin: "8% 20%" }}>
//             <ClipLoader color="blue" className='mx-96 my-36'></ClipLoader>
//         </div>
//     </>

//     if (error) return toast.error('An error has occurred: ' + error.message)
//     //
//     console.log(doctors);


//     if (isLoading) {
//         return (
//             <>
//                 <ClipLoader style={{ margin: "15% 50%" }} color='blue'></ClipLoader>
//             </>
//         )
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>About page </title>
//             </Helmet>
//             <h2 className='text-3xl font-bold text-center text-info my-6'>
            
//          <Typewriter
//             words={['Your New Smile ', ' Starts Here', 'Our all doctors' ]}
//             loop={Infinity}
//             cursor
//             cursorStyle='_'
//             typeSpeed={70}
//             deleteSpeed={50}
//             delaySpeed={1000}
//           />
//                   </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-2">

//                 {
//                     doctors.map(doctor =>
//                         <div className="card w-96 bg-base-100 shadow-xl text-indigo-600">
//                             <figure><img src={doctor.doctorProfile} className="w-full h-72" alt="Shoes" /></figure>
//                             <div className="card-body">
//                                 <h2 className="card-title">Specialty {doctor.specialty}</h2>
//                                 <h2 className="card-title">Email {doctor.doctorEmail}</h2>
//                                 <h2 className="card-title">Name {doctor.doctorName}</h2>
//                             </div>
//                         </div>
//                     )}


//             </div>
//         </>
//     );
// };

// export default About;