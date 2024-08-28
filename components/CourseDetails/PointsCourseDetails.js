import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoLinkExternal } from 'react-icons/go';
import { LuBadgeCheck } from 'react-icons/lu';

const PointsCourseDetails = ({ courseDetails }) => {
  return (
    <div className="max-w-6xl mx-auto px-3 mt-10 flex gap-5 flex-col md:flex-row">
      {/* NOTE: COURSE DETAILS IN POINTS */}
      <div className="flex-1 py-4 px-5 border-b-1 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg">
        <p
          className="font-bold text-3xl mb-5 text-center bg-gradient-to-r from-[#fc7477] 
      to-[#a021b9] text-white rounded-xl"
        >
          Why this is the most effective course?
        </p>
        <div className="grid grid-cols-1 gap-x-4 gap-y-3 text-[#3a4e67]">
          {courseDetails?.courseShortData?.map(
            (item) =>
              item.value !== '' && (
                <div key={item.name} className="flex items-start">
                  <div>
                    <LuBadgeCheck className="text-2xl text-[#55ce5b] font-bold" />
                  </div>

                  <span className="ml-2 text-[17px] font-semibold -mt-0.5">
                    {item.value}
                  </span>
                </div>
              ),
          )}
        </div>
      </div>
      <div className="w-[100%] md:w-[30%] mt-4">
        {/* NOTE: SUPPORT*/}
        <div className="bg-gradient-to-r from-[#b6f492] to-[rgb(51,139,147)] px-4 py-2 rounded-xl flex items-center gap-3">
          <Image
            width={500}
            height={300}
            src="/course/support.png"
            className="w-[110px]"
            alt=""
          />
          <div>
            <h2 className="text-xl font-semibold text-white">Support</h2>
            <p className="font-semibold text-white mt-2">
              {courseDetails?.extra_support}
            </p>
          </div>
        </div>
        {/* NOTE: PROJECT*/}
        <div className="mt-4 bg-gradient-to-b from-[#5128a1] to-[#20094f] px-4 py-2 rounded-xl flex items-center gap-3">
          <Image
            width={500}
            height={300}
            src="/course/newbie.png"
            className="w-[110px]"
            alt=""
          />
          <div>
            <h2 className="text-xl font-semibold text-white">Project</h2>
            <p className="font-normal text-white mt-2">
              {courseDetails?.project_number} Real World Project
            </p>
          </div>
        </div>
        {/* NOTE:  COURSE DETAILS LINK*/}
        <div className="bg-gradient-to-r from-[#6972e2] to-[#954ece] px-4 py-2 rounded-xl flex items-center gap-3 mt-4">
          <Image
            width={500}
            height={300}
            src="/course/details.png"
            className="w-[110px]"
            alt=""
          />
          <div>
            <h2 className="text-xl font-semibold text-white">
              Course Details Link
            </h2>

            <Link
              className="text-white text-lg inline-flex items-center justify-center gap-2 
              border-1 px-3 py-1 rounded-md mt-2 hover:text-black hover:bg-white transition-all duration-500"
              href={courseDetails?.drive_link || '/'}
              target="_blank"
              rel="noreferrer"
            >
              <GoLinkExternal />
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsCourseDetails;
