/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { useStateContext } from '../../src/context/ContextProvider';
import CrashCourseItem from './CrashCourseItem';

const CrashCourse = () => {
  const { language, courseData } = useStateContext();

  return (
    <div className="bg-[#ffffff]	pt-4 md:pt-8" id="courses">
      <div className="max-w-[1290px] py-6 md:py-10 mx-auto">
        <h2 className="text-center text-[26px] md:text-3xl font-bold font-heading mt-8 md:mt-16 mb-6 text-headerMain">
          {language === 'English' ? (
            'Best Courses for you'
          ) : (
            <span className="font-bangla">আপনার জন্য সেরা কোর্স</span>
          )}
        </h2>
        <p className="text-center text-base font-bold font-heading  mb-6 md:mb-16  text-headerMain	">
          At this moment Data Solution - 360 provides this following courses for
          you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5">
          {courseData.map((item) => (
            <CrashCourseItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrashCourse;
