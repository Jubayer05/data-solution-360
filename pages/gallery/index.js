import React from 'react';
import { Footer, Gallery, Navbar } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <Gallery />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
