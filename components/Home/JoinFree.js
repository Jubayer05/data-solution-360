/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../../src/data/json/data-analysis.json';

const JoinFree = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="bg-[#f9f9fa] pt-20 pb-10 px-3">
      <div
        className="relative max-w-6xl mx-auto border border-[#a2aabb] p-6 py-20 flex 
        justify-between items-center gap-8 flex-col lg:flex-row rounded-2xl overflow-hidden 
        bg-cover bg-[#101828] "
        style={{
          backgroundImage: 'url("/Background/join_free_bg.png")',
        }}
      >
        <div className="relative">
          <Lottie options={defaultOptions} />
        </div>
        <div className="pr-20">
          <h2 className="text-[#ffffff] text-[26px] md:text-[36px] leading-[50px]">
            Build your career learning Data Science with Data Solution 360
          </h2>
          <p className="text-[#ffffff] text-[16px]">
            Skill development is easy now, totally free. Join multiple live
            webinars, live courses and recorded courses from 8 different
            categories and 40 different skills.
          </p>
          <Link href="https://datasolution360.com/course-details/g0fAq19lGtOen9OmXp69">
            <button
              className="text-base font-semibold text-white px-4 py-2 border-2 rounded-md border-transparent
            bg-[#fd5406] transition-all duration-300 ease-linear hover:bg-[#da523a] 
            hover:border-primary"
            >
              Visit Trending Courses
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinFree;
