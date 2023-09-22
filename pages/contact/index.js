import React from 'react';
import { Contact, Footer, Navbar } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <Contact />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
