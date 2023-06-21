import React from 'react';
import { About, Footer, Navbar } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <About />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
