import React from 'react';
import { FaqComp, Footer, Navbar } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';
import { faqDataPage } from '../../src/data/data';

const index = () => {
  return (
    <div>
      <Navbar />
      <FaqComp title="Frequently Asked Questions" data={faqDataPage} />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
