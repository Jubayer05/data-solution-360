import React from 'react';
import { BsStack } from 'react-icons/bs';
import { FaArrowRightLong } from 'react-icons/fa6';

import Link from 'next/link';
import { useStateContext } from '../../src/context/ContextProvider';
import HomeCourseItem from './HomeCourseItem';

const HomeCourse = () => {
  const { language, courseData } = useStateContext();

  const runningCourses = courseData?.filter(
    (val) => val.status === 'Running' && val.hide !== true,
  );

  const registrationGoingOnCourses = courseData?.filter(
    (val) => val.status === 'Registration Going on' && val.hide !== true,
  );

  const upComingCourses = courseData?.filter(
    (val) => val.status === 'Upcoming' && val.hide !== true,
  );

  return (
    <div className="bg-[#f9f9fa]	py-4 md:py-10 px-3" id="courses">
      <div className="max-w-6xl bg-[#ffffff] py-4 md:py-6 mx-auto rounded-lg shadow">
        <h2 className="text-center text-[26px] md:text-[36px] font-bold font-heading m-0 text-black flex justify-center items-center gap-3">
          {language === 'English' ? (
            'All Courses'
          ) : (
            <span className="font-bangla">আপনার জন্য সেরা কোর্স</span>
          )}
          <span className="text-[#12b76a]">
            <BsStack />
          </span>
        </h2>
        <p className="text-center text-base font-bold font-heading  mb-2 md:mb-6 px-2">
          At this moment Data Solution - 360 provides this following courses for
          you.
        </p>

        <h2
          className="text-white font-heading md:ml-10 text-xl font-semibold inline-flex 
        items-center gap-2 transition-all px-2"
        >
          Our Courses <FaArrowRightLong />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 px-[1px] md:px-8 pt-0">
          {registrationGoingOnCourses.map((item) => (
            <HomeCourseItem key={item.id} item={item} />
          ))}
          {runningCourses.map((item) => (
            <HomeCourseItem key={item.id} item={item} running={true} />
          ))}
          {upComingCourses.map((item) => (
            <HomeCourseItem key={item.id} item={item} upcoming={true} />
          ))}
        </div>

        <div className="flex justify-center mt-8 ">
          <Link href="https://datasolution360.com/courses">
            <button
              className="text-base font-semibold text-[#101828] px-4 py-2 border-2 rounded-md border-transparent
            bg-[#eaecf0] transition-all duration-300 ease-linear hover:bg-[#d0d5dd] md:w-[350px] inline-flex items-center
            justify-center gap-2 uppercase"
            >
              See All <FaArrowRightLong />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCourse;
