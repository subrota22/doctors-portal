import React from 'react';
import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useAdmin from '../../hook/useAdmin';

const SideNavbar = () => {
const {user} = useContext(AuthContext) ;
const [isAdmin] = useAdmin(user.email)
return (
<>
<div className="drawer drawer-mobile">
  <input id="dashboard" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">      
  <Outlet className="w-full"></Outlet>
  </div> 
  <div className="drawer-side">
    <label htmlFor="dashboard" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80">
<li><NavLink to="/dashboard" className="my-2">My appointment</NavLink></li>
{ 
isAdmin && 
<>

<li><NavLink to="/dashboard/all-users"  className="my-2">All users </NavLink></li>
<li><NavLink to="/dashboard/add-doctor"  className="my-2">Add a doctor</NavLink></li>
<li><NavLink to="/dashboard/manage-doctors"  className="my-2">Manage doctors </NavLink></li>
</>
}
</ul>
  
  </div>
</div>
</>
);
};

export default SideNavbar;