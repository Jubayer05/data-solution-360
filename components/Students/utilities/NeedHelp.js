import Image from 'next/image';
import React from 'react';
import { MdOutlinePhoneInTalk } from 'react-icons/md';

const NeedHelp = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-10 mb-5 p-6 md:p-10 border rounded-2xl space-y-5 md:space-y-0">
      <Image
        width={500}
        height={300}
        src="/icon/technical-support.png"
        className="w-[80px] md:w-[120px] mx-auto md:mx-0"
        alt="Technical Support Icon"
      />
      <div className="text-center md:text-left md:flex-1 md:px-4">
        <h2 className="text-[20px] md:text-[24px] font-bold text-primary">
          Need Help?
        </h2>
        <p className="text-sm md:text-base">
          If you have any technical issue then call us{' '}
          <span className="text-primary">(10AM to 10PM)</span>
        </p>
      </div>
      <div className="text-center md:text-right">
        <p className="text-sm md:text-base font-semibold">Call Us</p>
        <button className="mt-2 px-4 py-3 bg-[#001f3f0e] rounded flex items-center justify-center gap-2 font-semibold text-sm md:text-base">
          <MdOutlinePhoneInTalk />
          <span>+8801996104096</span>
        </button>
      </div>
    </div>
  );
};

export default NeedHelp;
