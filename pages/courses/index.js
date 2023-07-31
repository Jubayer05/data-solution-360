import React from 'react';
import { CrashCourse, Footer, Navbar } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <CrashCourse />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
