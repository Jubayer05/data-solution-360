import React from 'react';
import { FaqComp, Footer, Navbar } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <FaqComp title="Frequently Asked Questions" />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
