import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import logo from "../../assets/images/logo.png" ;
const Navbar = () => {
const {user , singOutUser , setUser } = useContext(AuthContext) ;
const [theme , setTheme] = useState("light-theme") ;
React.useEffect(() => {
  document.body.className = theme ;
  }, [theme]);
  
  const hanldeThemeChange = () => {
    if(theme ==="light-theme"){
      setTheme("dark-theme") ;
      }else{
      setTheme("light-theme")
      }
  }
const hanldeLogOut = () => {
singOutUser()
.then(() =>{
toast.info("Your profile has beeen log out !! ") ;
return setUser({}) ;
})
}

const menueItems = <>
<input type="checkbox" className="toggle mt-5" onClick={hanldeThemeChange}   />
<li><Link to="/">Home</Link></li>

{
user.uid ? <> 
<li><Link to="/dashboard"> Dashboard </Link></li>
<li><Link to="/about">About</Link></li>
<li><Link to="/apointment">Appointment</Link></li>
<li><Link to="/contact">Contact Us</Link></li>
</> :
<>
<li><Link to="/login">Login</Link></li> 
<li><Link to="/register">Register</Link></li>
</>
}
{
user.uid && 
<>
<li>
<div className="dropdown dropdown-end">
<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
<div className="w-10 rounded-full">
<img src={user.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXj9REXElDfjpsoPWyLVWvqMlL37WEWolQuP4hjZk&s"} alt='user profile'/>
</div>
</label>
<ul tabIndex={0} className="menu menu-compact
 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52
flex md:flex-col lg:flex-row">
<li>
<NavLink to="/profile" className="justify-between">
Profile
<span className="badge">New</span>
</NavLink>
</li>
<li>  <NavLink to="/edit-profile"> Settings</NavLink></li>
<li><NavLink onClick={hanldeLogOut}>Logout</NavLink></li>
</ul>
</div>
</li>
</>
}

</>



return (
<React.Fragment>
<div className="navbar bg-base-600">

<div className="navbar-start">
<NavLink to="/" className="normal-case text-xl flex">
<img src={logo} alt="navbar logo" className='h-14 w-16'/>
<h2 className='hidden md:block text-success mx-4 mt-3 font-bold'>Doctors portal</h2>
</NavLink>
</div>

<div className="dropdown mr-32" >
<label tabIndex={0} className="btn btn-ghost lg:hidden">
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
</label>
<ul tabIndex={1} className="menu menu-compact  h-4 dropdown-content mt-3 p-2 
flex-col  shadow bg-base-100 rounded-box w-52">
{menueItems}
</ul>
</div>

<div className="navbar-center hidden lg:flex mx-8">
<ul className="menu menu-horizontal font-bold pt-2 pb-4">
{ menueItems}
</ul>
</div>
<label htmlFor="dashboard" className="btn btn-ghost drawer-button lg:hidden ml-auto">
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
</label>
</div>
</React.Fragment>
);
};

export default Navbar;