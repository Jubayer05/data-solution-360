/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { AiOutlineClockCircle, AiOutlineFileText } from 'react-icons/ai';
import { BiBarChart } from 'react-icons/bi';

import { Avatar } from 'antd';
import Link from 'next/link';
import { BsStarFill } from 'react-icons/bs';
import { useStateContext } from '../../src/context/ContextProvider';

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

const CrashCourseItem = ({ item }) => {
  return (
    <div className=" sm:w-full mx-auto rounded-lg overflow-hidden sm:mx-2 hover:-translate-y-3 hover:shadow-xl transition-translate duration-300 cursor-pointer mt-4">
      <Link href={`/course-details/${item.key}`}>
        <img src={item.img} alt="" className="w-full h-60" />
        <div className="px-4 py-3 border-1 rounded-lg rounded-t-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-[orange] font-heading mr-2">5</span>
              <div className="flex text-[orange] ">
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
                {/* <BsStarHalf className="mx-[1px]" /> */}
              </div>
              <div className="font-bold ml-1 text-gray-500">
                ({item.review})
              </div>
            </div>
            <div className="flex items-center text-[#4F547B]">
              <BiBarChart className="mr-0.5" />
              <span>all level</span>
            </div>
          </div>
          <p className="inline-block h-[80px] text-lg font-semibold mb-1.5 mt-2 text-[#140342] hover:text-primary">
            {item.title}
          </p>
          <div className="flex items-center font-medium text-[14px] flex-wrap text-[#4F547B]">
            <div className="flex items-center">
              <AiOutlineFileText className="mr-1" />
              <span className="">{item.lesson} Lessons</span>
            </div>
            <div className="flex items-center mx-2">
              <AiOutlineClockCircle className="mr-1" />
              {/* <span>{item?.total_seat_number} Seats Remaining</span> */}
              <span>70 Seats</span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-slate-200 mt-4 mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar src="/team/sakib.jpg" />
              <span className="ml-2">{item?.name_of_the_instructor}</span>
            </div>
            <div>
              <span className="flex items-center font-bold text-base text-[orangered]">
                <strike>{item?.price}/-</strike>
              </span>
              <span className="text-[#1d2939] font-bold text-2xl">
                {item?.discounted_price}/-
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
