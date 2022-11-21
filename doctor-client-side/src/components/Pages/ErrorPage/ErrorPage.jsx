import React from 'react';
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='mt-2'>
            <h2 className='text-3xl font-bold text-center mb-4'> Page not found </h2>
           <h2 className="text-center">  <NavLink to="/">Go to the <span className='text-blue-400'>home</span> page </NavLink></h2>
           <NavLink to="/"> 
            <img src="https://i.ibb.co/XzVnRDV/404.webp" alt="page not found" 
            className='h-screen w-screen'/>
            </NavLink>
        </div>
    );
};

export default ErrorPage;