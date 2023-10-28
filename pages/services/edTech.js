import React from 'react';
import { Footer, Navbar } from '../../components';
import ComingSoon from '../../components/utilities/ComingSoon';
import WhatsApp from '../../components/utilities/WhatsApp';

const edTech = () => {
  return (
    <div>
      <Navbar />
      <ComingSoon />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default edTech;
