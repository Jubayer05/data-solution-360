import React from 'react';
import { CourseDetails, Footer, Navbar } from '../../components';
import WhatsApp from '../../components/utilities/WhatsApp';

const slug = () => {
  return (
    <div>
      <Navbar />
      <CourseDetails />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default slug;
