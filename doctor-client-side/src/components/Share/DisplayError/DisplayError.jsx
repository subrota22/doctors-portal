import React, { useContext } from 'react';
import { NavLink, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError() ;
    const {singOutUser , setUser} = useContext(AuthContext) ;
    const navigate = useNavigate() ;
    const handleSignOut = () => {
       setUser({}) ;
       singOutUser() ;
       navigate("/login") ;
    }
    return (
        <>
           <div className="text-center p-6 ">
           <div className='bg-red-400 p-4 my-3 text-xl font-bold text-white rounded-md'>
            Something went wrong...
            </div> 

            <div className='bg-red-400 p-4 text-xl my-3 font-bold text-white rounded-md'>
             {error.message || error.statusText}
            </div>

            <p className='textColor my-2'>Please log out and login agian 
            <NavLink to="/login">
            <span className='text-red-400'>  Log in </span>
            </NavLink> Or </p>
            <button className='btn btn-error  text-white w-44' 
            onClick={handleSignOut} > Log out </button>
           </div>
        </>
    );
};

export default DisplayError;