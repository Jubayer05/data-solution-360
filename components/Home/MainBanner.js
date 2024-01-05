/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import * as animationData from '../../src/data/json/data-analysis.json';

const MainBanner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="bg-main-bg pt-20 -mt-20">
      <div
        className="max-w-6xl mx-auto p-4 flex justify-between items-center flex-col lg:flex-row gap-4"
        style={{
          minHeight: '100vh',
        }}
      >
        <div className="flex-1">
          <h2 className="text-headerMain text-[28px] md:text-[40px] leading-[1.4] md:leading-[1.05] font-heading tracking-wide mt-10 md:mt-2">
            Learn Data Analysis and Explore Your Career
          </h2>
          <p className="text-lg text-headerSub my-8">
            Best Data Science learning Platform in Bangladesh
          </p>
          <Link href="/courses">
            <button
              className="text-base font-semibold text-white px-4 py-3 border-2 rounded-lg border-transparent bg-primary-bg 
            transition-all duration-300 ease-linear hover:bg-white hover:text-primary 
            hover:border-primary"
            >
              Explore Courses
            </button>
          </Link>
        </div>
        <div className="flex-1 overflow-visible w-[350px] md:w-[500px]">
          {/* <Lottie options={defaultOptions} /> */}
          <img
            className="w-[600px] mx-auto"
            src="/Background/banner.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
