import React from 'react';
import { Footer, Navbar, WhatsApp } from '../../../components';
import JoinLive from '../../../components/Services/JoinLive';

const joinLive = () => {
  return (
    <div>
      <Navbar />
      <JoinLive />
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default joinLive;
