import { Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';

const WhatsApp = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const handleClick = () => {
    const phoneNumber = '8801892432631'; // Replace with your desired phone number
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
        className={`fixed flex items-center flex-col gap-2 bottom-[80px] md:bottom-24  
          bg-white px-4 py-3 rounded-xl font-bangla w-60 md:w-72 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] 
          z-[900] transition-all duration-500 ${
            showPopup
              ? 'opacity-100 visible scale-100 right-2 md:right-7'
              : 'opacity-0 invisible scale-[0.3] -right-20 md:-bottom-[30px]'
          }`}
      >
        <p className="text-base md:text-xl font-bold text-center">
          আপনার জিজ্ঞেসা <br /> ক্যারিয়ার কাউন্সিলরকে বলুন
        </p>
        <Image
          width={500}
          height={300}
          src="/icon/technical-support.png"
          alt="whatsapp"
          className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] rounded-full border-1"
        />
        <div className="h-[50px]" />
        <button
          className="bg-[#eaecf0] hover:bg-[#d2d3d5] transition-all duration-300 
        w-full py-2 rounded-md text-base md:text-lg"
        >
          <Link
            href="tel:+8801996104096"
            className="flex items-center justify-center gap-2 "
          >
            <Phone className="text-base md:text-xl" />
            <span>Call</span>
          </Link>
        </button>
        <button
          onClick={handleClick}
          className="flex items-center justify-center bg-[#12b76a] hover:bg-[rgb(10,145,82)] 
          transition-all duration-300 w-full gap-2 py-2 rounded-md text-white text-base md:text-lg"
        >
          <IoLogoWhatsapp className="text-lg md:text-2xl" />
          <span>Whatsapp</span>
        </button>
      </div>

      <div
        className="fixed bottom-[20px] md:bottom-8 right-[0.5rem] md:right-10 z-[900]"
        onClick={handleOpenPopup}
      >
        {/* Ripple Effect Wrapper (Light Pink) */}
        <div
          className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] 
    w-[100px] h-[50px] rounded-xl flex items-center justify-center -z-10"
        >
          <div className="absolute w-full h-full bg-[#ff3385] rounded-xl animate-pulseFade [animation-delay:0s]"></div>
          <div className="absolute w-full h-full bg-[#ff3385] rounded-xl animate-pulseFade [animation-delay:1s]"></div>
          <div className="absolute w-full h-full bg-[#ff3385] rounded-xl animate-pulseFade [animation-delay:2s]"></div>
        </div>

        {/* Support Button (Bright Pink) */}
        <div
          className="flex items-center gap-2 cursor-pointer bg-[#cf0469] text-white px-4 py-3 
           rounded-xl font-bangla text-sm md:text-lg z-[10] animate-pulseRing 
           scale-105 hover:bg-[#7806b6] hover:text-white transition-all duration-300"
        >
          <Phone />
          <span>সাপোর্ট নিন</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
