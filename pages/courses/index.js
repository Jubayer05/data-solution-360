import React from 'react';
import {
  HomeCourse,
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
      <HomeCourse />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default index;
