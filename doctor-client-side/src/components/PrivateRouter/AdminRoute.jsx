import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import ClipLoader from "react-spinners/ClipLoader";
import useAdmin from '../hook/useAdmin';
const AdminRoute = ({children}) => {
const {user , loading} = useContext(AuthContext) ;
const [isAdmin , adminLoading ] = useAdmin(user.email) ;
const location = useLocation() ;
if(adminLoading) {
return (
<>
<ClipLoader style={{margin:"10% 50%" }} color='textColor'/>
</>
)
}
if(loading){
return (
<>
<ClipLoader style={{margin:"10% 50%" }} color='textColor'/>
</>
)
}
if(user && user.uid && isAdmin ) {
return children ;
}
else {
return <Navigate to="/" state={{from:location}} replace></Navigate>
}
};

export default AdminRoute;