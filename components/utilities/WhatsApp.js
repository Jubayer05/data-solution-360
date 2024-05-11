/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const WhatsApp = () => {
  const handleClick = () => {
    const phoneNumber = '8801996104096'; // Replace with your desired phone number
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <div
        className="w-[60px] fixed bottom-[6rem] md:bottom-24 right-[1.55rem] md:right-7 cursor-pointer"
        onClick={handleClick}
      >
        <img src="/whatsapp.png" alt="whatsapp" />
      </div>

      <FacebookProvider appId="719749473297599" chatSupport>
        <CustomChat pageId="131657960804162" minimized={false} />
      </FacebookProvider>
    </div>
  );
};

export default WhatsApp;
