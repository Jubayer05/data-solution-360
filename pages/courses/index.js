import React from 'react';
import {
  CrashCourse,
  Footer,
  Navbar,
  Trending,
  WhatsApp,
} from '../../components';

const index = () => {
  return (
    <div>
      <Navbar />
      <Trending />
      <CrashCourse />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
