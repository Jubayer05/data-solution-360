import React from 'react';
import { Career, Footer, Navbar } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';
const index = () => {
  return (
    <div>
      <Navbar />
      <Career />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
