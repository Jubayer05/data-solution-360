/* eslint-disable @next/next/no-img-element */
import React from 'react';

const JoinFree = () => {
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
          {/* <img
            // src="/Background/join_main.png"
            className="w-[600px] z-10"
            alt=""
          /> */}
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
          <button
            className="text-base font-semibold text-white px-4 py-2 border-2 rounded-md border-transparent
             bg-[#fd5406] transition-all duration-300 ease-linear hover:bg-[#da523a] 
            hover:border-primary"
          >
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinFree;
