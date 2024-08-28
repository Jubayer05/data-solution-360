import Image from 'next/image';
import React from 'react';
import { MdOutlinePhoneInTalk } from 'react-icons/md';

const NeedHelp = () => {
  return (
    <div className="flex justify-between items-center mt-10 mb-5 p-10  border rounded-2xl">
      <Image
        width={500}
        height={300}
        src="/icon/technical-support.png"
        className="w-[120px] "
        alt=""
      />
      <div className="text-center">
        <h2 className="text-[24px] font-bold text-primary">Need Help?</h2>
        <p>
          If you have any technical issue then call us{' '}
          <span className="text-primary">(10AM to 10PM)</span>
        </p>
      </div>
      <div className="text-center">
        <p>Call Us</p>
        <button
          className="px-4 py-3 bg-[#001f3f0e] rounded flex items-center font-semibold mt-2
            justify-center gap-2"
        >
          <MdOutlinePhoneInTalk />
          <span>+8801996104096</span>
        </button>
      </div>
    </div>
  );
};

export default NeedHelp;
