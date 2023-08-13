/* eslint-disable @next/next/no-img-element */
import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';

const WhatsApp = () => {
  const handleClick = () => {
    const phoneNumber = '8801996104096'; // Replace with your desired phone number
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <div
        className="w-[50px] md:w-[60px] fixed bottom-7 md:bottom-10 right-5 md:right-7 cursor-pointer"
        onClick={handleClick}
      >
        <img src="/whatsapp.png" alt="whatsapp" />
      </div>

      <div className="w-[50px] md:w-[60px] fixed bottom-14 md:bottom-20 right-5 md:right-7 cursor-pointer">
        <MessengerCustomerChat
          pageId="61550107890707"
          appId="719749473297599"
          htmlRef="<REF_STRING>"
        />
      </div>
    </div>
  );
};

export default WhatsApp;
