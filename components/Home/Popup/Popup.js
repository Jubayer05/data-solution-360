import Link from 'next/link';
import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const Popup = ({ handler }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[#0000008f] z-30 flex justify-center items-center">
      <div className="bg-[#bef4d4] h-3/5 w-3/5 rounded-md relative flex justify-center items-center">
        <div>
          <h2 className="font-heading text-2xl md:text-4xl text-center mt-4">
            Welcome to Data Solution - 360
          </h2>
          <p className="text-center text-lg mt-6 font-heading">
            Sign up today and get 10% extra discount.
          </p>
          <div className="text-center mt-10">
            <Link href="/login">
              <button className="bg-[#1f0835] text-[#f9fbff]  py-[12px] px-[24px] rounded-[8px] hover:opacity-[0.9] transition-all">
                Click Here
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute -top-3 -right-3">
          <RxCross1
            onClick={() => handler(false)}
            className="text-2xl cursor-pointer bg-black border-2 p-1 rounded-full text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup;
