import React from 'react';
import { Footer, Navbar } from '../../components';
import LandingPage from '../../components/DataLytics360/DataLytics360';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
