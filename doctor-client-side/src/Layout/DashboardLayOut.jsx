import React from 'react';
import Footer from '../components/Share/Footer/Footer';
import SideNavbar from '../components/Dashboard/SideNavbar/SideNavbar';
import Navbar from '../components/Share/Navbar/Navbar';
import { Helmet } from 'react-helmet';

const DashboardLayOut = () => {
    return (
        <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <Navbar></Navbar> 
        <SideNavbar></SideNavbar>
        <Footer></Footer>
        </>
    );
};

export default DashboardLayOut;