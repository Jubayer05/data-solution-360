import React from 'react';
import { Footer, Navbar } from '../../components';
import Services from '../../components/Services/Services';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <Services />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
