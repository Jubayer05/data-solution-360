import Link from 'next/link';
import React from 'react';
import { RxCross1 } from 'react-icons/rx';

const Popup = ({ handler }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-[#0000008f] z-30 flex justify-center items-center">
      <div
        style={{
          backgroundImage:
            'url("https://firebasestorage.googleapis.com/v0/b/data-solution-360.appspot.com/o/courseImage%2Fjubayer0504%40gmail.com%2Ffinal-fianl%20(1).jpg?alt=media&token=d3cec0eb-e10d-4319-9d51-0f99d0289b28")',
        }}
        className=" h-[230px] md:h-[380px] lg:h-[480px] w-[350px] md:w-[600px] lg:w-[800px] p-2 rounded-md relative flex justify-center items-end bg-cover"
      >
        {/* <div>
          <h2 className="font-heading text-2xl md:text-4xl text-center mt-4">
            Welcome to <br /> Data Solution - 360
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
        </div> */}
        {/* <div>&nbsp;</div> */}
        <Link href="course-details/g0fAq19lGtOen9OmXp69">
          <button
            className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center text-gray-300 
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
