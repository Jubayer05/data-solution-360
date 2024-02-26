/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IoIosPeople } from 'react-icons/io';

import Link from 'next/link';
import { ImClock } from 'react-icons/im';

const CourseItem = ({ item }) => {
  const discountPercentage = Math.round(
    100 - (item?.discounted_price / item?.price) * 100,
  );

  console.log(item);

  return (
    <div
      className="w-full mx-auto rounded-lg overflow-hidden sm:mx-2 border hover:border-[#676767] 
    transition-border duration-300 cursor-pointer"
    >
      <Link href={`/course-details/${item.key}`}>
        <img src={item.img} alt="" className="w-full h-44" />
        <div
          className="rounded-lg rounded-t-none flex flex-col"
          style={{ height: 'calc(100% - 176px)' }}
        >
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-[orange] font-heading mr-2">5</span>
              <div className="flex text-[orange] ">
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
              </div>
              <div className="font-bold ml-1 text-gray-500">
                ({item.review})
              </div>
            </div>
            <div className="flex items-center text-[#4F547B]">
              <BiBarChart className="mr-0.5" />
              <span>all level</span>
            </div>
          </div> */}
          <div className="p-2 border-b-1 border-[#d6dae1] flex items-center flex-wrap">
            <div className="py-1 px-2 m-1 bg-[#eaecf0] rounded">
              <span className="text-[#101828] text-[12px] block -mt-[1px]">
                Batch {item?.batch_no}
              </span>
            </div>
            <div className="py-1 px-2 m-1 bg-[#eaecf0] rounded flex items-center gap-1 text-[#101828]">
              <IoIosPeople />
              <span className=" text-[12px] block -mt-[1px]">
                {item?.remaining_seat_number} Seats Left
              </span>
            </div>
            <div className="py-1 px-2 m-1 bg-[#eaecf0] rounded flex items-center gap-1 text-[#101828]">
              <ImClock />
              <span className="text-[12px] -mt-[1px]">
                {new Date(item?.main_class_starting_date).getTime() >=
                new Date().getTime()
                  ? Math.ceil(
                      (new Date(item?.main_class_starting_date).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24),
                    )
                  : 0}{' '}
                Days Left
              </span>
            </div>
          </div>
          <p
            className=" flex-1 text-lg font-bold mb-1.5 mt-2 text-[#140342]
          px-4 hover:text-primary"
          >
            {item.title}
          </p>
          <div
            className="flex justify-end font-medium text-[14px] flex-wrap text-[#4F547B]
            bg-[#f9f9fa] py-4 px-2"
          >
            <button
              className="bg-[#113f5a] text-[#f9fbff] py-[10px] px-[24px] rounded-[8px]
             hover:opacity-[0.9] transition-all uppercase tracking-wider"
            >
              See Details
            </button>
          </div>

          {/* {item.status && (
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
          )} */}
        </div>
      </Link>
    </div>
  );
};

export default CourseItem;
