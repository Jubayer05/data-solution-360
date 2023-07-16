import React from 'react';
import { Footer, Navbar } from '../../components';
import FreeCourseHome from '../../components/FreeCourse/FreeCourseHome';
import WhatsApp from '../../components/utilities/WhatsApp';

const index = () => {
  return (
    <div>
      <Navbar />
      <FreeCourseHome />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
