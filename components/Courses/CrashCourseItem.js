/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { AiOutlineClockCircle, AiOutlineFileText } from 'react-icons/ai';
import { BiBarChart } from 'react-icons/bi';

import Link from 'next/link';
import { BsStarFill } from 'react-icons/bs';

const CrashCourseItem = ({ item }) => {
  const discountPercentage = Math.round(
    100 - (item?.discounted_price / item?.price) * 100,
  );

  return (
    <div className="w-full mx-auto rounded-lg overflow-hidden sm:mx-2 hover:-translate-y-3 hover:shadow-xl transition-translate duration-300 cursor-pointer mt-4">
      <Link href={`/course-details/${item.key}`}>
        <img src={item.img} alt="" className="w-full h-56" />
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

          {item.status === 'On Going' && (
            <>
              <div className="h-[1px] w-full bg-slate-200 mt-4 mb-3" />
              <div className="flex items-center justify-between">
                <div className="px-3 pt-1 pb-[1px] border-1 border-[#fd6406] rounded-full">
                  <h4 className="text-[#fd6406] italic">
                    <span className="text-xl">{discountPercentage}%</span> off
                  </h4>
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
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CrashCourseItem;
