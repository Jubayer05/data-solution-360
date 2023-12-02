/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const Popup = ({ handler }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[#0000008f] z-30 flex justify-center items-center">
      <div className="-top-36 h-[230px] md:h-[350px] lg:h-[380px] w-[350px] md:w-[500px] lg:w-[600px] rounded-md relative flex items-center flex-col bg-cover">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/data-solution-360.appspot.com/o/courseImage%2Fjubayer0504%40gmail.com%2Fpopup.jpeg?alt=media&token=dde3945f-204d-4d0e-b3ba-7eb20f4d4f97"
          alt="Popup img"
          className="rounded-lg"
        />
        <Link href="course-details/me2qACJYYnfpUVMS1LL0">
          <button
            className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center text-gray-300 rounded-md mt-2
          bg-primary-bg transition-all duration-300 ease-linear `}
          >
            Click Here for Details
          </button>
        </Link>
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
