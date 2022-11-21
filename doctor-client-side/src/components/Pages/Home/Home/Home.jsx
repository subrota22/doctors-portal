import React from 'react';
import { Helmet } from 'react-helmet';
import AddressCard from '../AddressCard/AddressCard';
import DcontorApointment from '../Apointment/DcontorApointment';
import Banner from '../Banner/Banner';
import ContactForm from '../ContactForm/ContactForm';
import Services from '../Services/Services';
import Testimonal from '../Testimonal/Testimonal';

const Home = () => {
    return (
        <React.Fragment>
          <Helmet>
            <title> Home page </title>
          </Helmet>
          <Banner></Banner>
          <AddressCard></AddressCard>
          <Services></Services>
          <DcontorApointment></DcontorApointment>
          <Testimonal></Testimonal>
          <ContactForm></ContactForm>
        </React.Fragment>
    );
};

export default Home;