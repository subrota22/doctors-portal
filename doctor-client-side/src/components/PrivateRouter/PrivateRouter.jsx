import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import ClipLoader from "react-spinners/ClipLoader";
const PrivateRouter = ({children}) => {
 const {user , loading} = useContext(AuthContext) ;
 const location = useLocation() ;
 if(loading){
 return (
    <>
   <ClipLoader style={{margin:"10% 50%" }} color='textColor'/>
  </>
 )
 }
 if(user && user.uid ) {
  return children ;
 }
else {
return <Navigate to="/login" state={{from:location}} replace></Navigate>
 }
};

export default PrivateRouter;