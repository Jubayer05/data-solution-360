/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io5';

const WhatsApp = () => {
  const [showPopup, setShowPopup] = useState(true);
  const popupRef = useRef(null);

  const handleClick = () => {
    const phoneNumber = '8801996104096'; // Replace with your desired phone number
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    window.open(url, '_blank');
  };

  const handleOpenPopup = () => {
    setShowPopup(!showPopup);
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
  }, [showPopup]);

  return (
    <div>
      <div
        ref={popupRef}
        className={`fixed flex items-center flex-col gap-2 bottom-[20px] md:bottom-24  
          bg-white px-4 py-3 rounded-xl font-bangla text-lg w-72 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] 
          z-50 transition-all duration-500 ${
            showPopup
              ? 'opacity-100 visible scale-100 right-7'
              : 'opacity-0 invisible scale-[0.3] -right-20 md:-bottom-[30px]'
          }`}
      >
        <p className="text-xl font-bold text-center">
          কথা বলুন <br /> ক্যারিয়ার কাউন্সিলরের সাথে
        </p>
        <img
          src="/course/support.png"
          alt="whatsapp"
          className="w-[150px] h-[150px] rounded-full"
        />
        <div className="h-[50px]" />
        <button
          className="bg-[#eaecf0] hover:bg-[#d2d3d5] transition-all duration-300 
        w-full py-2 rounded-md "
        >
          <Link
            href="tel:+8801996104096"
            className="flex items-center justify-center gap-2 "
          >
            <FiPhoneCall className="text-xl" />
            <span>Call</span>
          </Link>
        </button>
        <button
          onClick={handleClick}
          className="flex items-center justify-center bg-[#12b76a] hover:bg-[rgb(10,145,82)] 
          transition-all duration-300 w-full gap-2 py-2 rounded-md text-white"
        >
          <IoLogoWhatsapp className="text-2xl" />
          <span>Whatsapp</span>
        </button>
      </div>

      <div
        className="fixed flex items-center gap-2 bottom-[20px]] md:bottom-8 right-[1.55rem] md:right-7
         cursor-pointer bg-slate-700 text-white px-4 py-3 rounded-xl font-bangla text-lg"
        onClick={handleOpenPopup}
      >
        <FiPhoneCall />
        <span>কল করুন</span>
      </div>
    </div>
  );
};

export default WhatsApp;
