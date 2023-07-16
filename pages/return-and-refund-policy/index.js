import React from 'react';
import { Footer, Navbar, RefundPolicy } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <RefundPolicy />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
