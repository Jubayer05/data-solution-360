import React from 'react';
import { Footer, Navbar, WhatsApp } from '../../../components';
import Checkout from '../../../components/Purchase/Checkout';

const checkout = () => {
  return (
    <div>
      <Navbar />
      <Checkout />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default checkout;
