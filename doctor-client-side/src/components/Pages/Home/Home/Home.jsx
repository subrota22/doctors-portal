import React from 'react';
import { Helmet } from 'react-helmet';
import AddressCard from '../AddressCard/AddressCard';
import DcontorApointment from '../Apointment/DcontorApointment';
import Banner from '../Banner/Banner';
import ContactForm from '../ContactForm/ContactForm';
import Services from '../Services/Services';
import Testimonal from '../Testimonal/Testimonal';
import Blogs from '../Blogs/Blogs';
import FAQ from  "../FrequentylAskQusetions/FrequentylAskQusetions";
import Content from '../Content/Content';
import Pricing from '../Pricing/Pricing';
import NewLatter from '../NewLatter/NewLatter';
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
          <Blogs></Blogs>
          <FAQ></FAQ>
          <Content></Content>
          <Pricing></Pricing>
          <NewLatter></NewLatter>
        </React.Fragment>
    );
};

export default Home;