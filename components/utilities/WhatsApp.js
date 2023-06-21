/* eslint-disable @next/next/no-img-element */
import React from 'react';

const WhatsApp = () => {
  const handleClick = () => {
    const phoneNumber = '8801996104096'; // Replace with your desired phone number
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div
      className="w-[60px] fixed bottom-10 right-7 cursor-pointer"
      onClick={handleClick}
    >
      <img src="/whatsapp.png" alt="whatsapp" />
    </div>
  );
};

export default WhatsApp;
