import { format } from 'date-fns';
import React from 'react';
import {NavLink} from "react-router-dom" ;
import footerImage from "../../assets/images/footer.png" ;
const Footer = () => {
const footerStyle = {
backgroundImage:`url('${footerImage}')` ,
backgroundSize:"cover" ,
backgroundPosition:"center"
}
    return (
     <React.Fragment>
    <div style={footerStyle} className="mt-5">
    <footer className="footer p-10" >
  <div>
    <span className="footer-title">Services</span> 
    <NavLink to="/" className="link link-hover">Branding</NavLink>
    <NavLink to="/" className="link link-hover">Design</NavLink>
    <NavLink to="/" className="link link-hover">Marketing</NavLink>
    <NavLink to="/" className="link link-hover">Advertisement</NavLink>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <NavLink to="/" className="link link-hover">About us</NavLink>
    <NavLink to="/" className="link link-hover">Contact</NavLink>
    <NavLink to="/" className="link link-hover">Jobs</NavLink>
    <NavLink to="/" className="link link-hover">Press kit</NavLink>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <NavLink to="/" className="link link-hover">Terms of use</NavLink>
    <NavLink to="/" className="link link-hover">Privacy policy</NavLink>
    <NavLink to="/" className="link link-hover">Cookie policy</NavLink>
  </div>
</footer>
    <div className="text-center font-bold text-2xl py-3">
    <h2> &copy; Copy right by Subrota Chandra Sarker </h2>
    <h2>Copy right date : {format(new Date() , "PP")} </h2>
    </div>
    </div>
     </React.Fragment>
    );
};

export default Footer;