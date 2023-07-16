import React from 'react';
import { Footer, Navbar, PrivacyPolicy } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <PrivacyPolicy />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
