import React from 'react';
import { Footer, FreeCourse, Navbar } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <FreeCourse />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
