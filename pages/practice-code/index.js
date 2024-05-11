import React from 'react';
import { Footer, Navbar } from '../../components';
import PracticeCodeMainComp from '../../components/PracticeCode/PracticeCodeMainComp';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <PracticeCodeMainComp />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
