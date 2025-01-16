import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import * as animationData from '../../src/data/json/data-analysis.json';
const LottieAnimation = dynamic(
  () => import('../utilities/Home/LottieAnimation'),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse bg-gray-200 w-full h-64 rounded-lg" />
    ), // Loading placeholder
  },
);
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
          <LottieAnimation
            animationData={animationData}
            className="w-full max-w-md"
          />
        </div>
        <div className="md:pr-20">
          <h2 className="text-[#ffffff] text-[24px] md:text-[36px] leading-[35px] md:leading-[50px] mb-5 md:mb-0">
            Build your career learning Data Science with Data Solution 360
          </h2>
          <p className="text-[#ffffff] text-[16px] mb-5 md:mb-0">
            You will get continuous support and guidance from our team even
            after you finish the course.
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
