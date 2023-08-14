/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { CustomChat, FacebookProvider } from 'react-facebook';

const WhatsApp = () => {
  const handleClick = () => {
    const phoneNumber = '8801996104096'; // Replace with your desired phone number
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <div
        className="w-[50px] md:w-[55px] fixed bottom-20 md:bottom-28 right-5 md:right-7 cursor-pointer"
        onClick={handleClick}
      >
        <img src="/whatsapp.png" alt="whatsapp" />
      </div>

      <div className="w-[50px] md:w-[60px] fixed bottom-14 md:bottom-20 right-5 md:right-7 cursor-pointer">
        {/* <MessengerCustomerChat
          pageId="61550107890707"
          appId=""
          htmlRef="<REF_STRING>"
        /> */}

        <FacebookProvider appId="719749473297599" chatSupport>
          <CustomChat pageId="122093005160018799" minimized={false} />
        </FacebookProvider>
      </div>
    </div>
  );
};

export default WhatsApp;
