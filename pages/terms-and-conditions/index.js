import React from 'react';
import { Footer, Navbar, TermsCondition } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <TermsCondition />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
