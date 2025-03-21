import React from 'react';
import { Footer, Navbar } from '../../components';
import Prospectus from '../../components/Prospectus/Prospectus';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <Prospectus />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
