/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { BiShareAlt } from 'react-icons/bi';
import { BsCheck2Circle, BsTelephone } from 'react-icons/bs';
import { ImClock } from 'react-icons/im';

const RightSide = ({courseDetails}) => {
  return (
    <div className="my-2 p-4 md:p-0 flex-grow-[1] md:flex-grow-[.42] pb-3 shrink w-[100%] md:w-[40%] static md:sticky top-[-185px]">
        <div className="mb-3">
          <img
            src={courseDetails?.img}
            alt=""
            className="rounded-md w-[100%] h-[360px]"
          />
        </div>

        <div className="border-1 rounded-md">
          {/* NOTE: RIGHT HEADER */}
          <div className="flex items-center justify-center gap-4 border-b-1 py-4">
            <div className="flex bg-[#fff1e9] text-[#1d2939] px-[6px] py-[10px] items-center justify-center rounded-[4px]">
              <ImClock className="text-[rgb(223,97,52)] mr-[6px]" />
              <span className="text-sm font-[700]">
                {/* {new Date(courseDetails?.main_class_starting_date).getTime() >=
                new Date().getTime()
                  ? Math.ceil(
                      (new Date(
                        courseDetails?.main_class_starting_date,
                      ).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24),
                    )
                  : 0}{' '} */}
                7 Days Left
              </span>
            </div>
            <div className="flex bg-[rgba(161,68,255,0.15)] text-[#1d2939] px-[6px] py-[10px] items-center justify-center rounded-[4px]">
              <ImClock className="text-[rgb(120,12,208)] mr-[6px]" />
              <span className="text-sm font-[700]">
                Total {courseDetails?.total_seat_number} Seat
              </span>
            </div>
          </div>

          {/* NOTE: PRICE & BUTTON */}
          <div className="py-4 px-5 border-b-1">
            <div className="flex items-center">
              <div>
                <span className="text-[orangered] font-bold text-lg">
                  <strike>{courseDetails?.price}/-</strike>
                </span>
              </div>
              <div className="ml-4">
                <span className="text-[#1d2939] font-bold text-3xl">
                  {courseDetails?.discounted_price}/-
                </span>
              </div>
              <div className="flex items-center ml-auto border-b-1 cursor-pointer">
                <BiShareAlt />
                <span>Share</span>
              </div>
            </div>
            <div>
              <button className="bg-primary-bg text-[#f9fbff] w-full py-[12px] px-[24px] rounded-[8px] mt-6 hover:opacity-[0.8] transition-all">
                Join Live Batch
              </button>
            </div>
          </div>
          {/* NOTE: COURSE DETAILS IN POINTS */}
          <div className="py-4 px-5 border-b-1">
            <p className="font-bold text-lg">You will get from this course</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[#3a4e67]">
              {courseDetails?.courseShortData?.map(
                (item) =>
                  item.value !== '' && (
                    <div key={item.name} className="flex items-start">
                      <BsCheck2Circle />
                      <span className="ml-2 -mt-1">{item.value}</span>
                    </div>
                  ),
              )}
            </div>
          </div>
          {/* NOTE: RIGHT BOTTOM */}
          <div className="py-4 px-5">
            <div className="flex justify-center items-center">
              <span className="flex items-center text-[blue] mr-2 cursor-pointer">
                <BsTelephone className="mr-2" />
                Call Us 01870106460
              </span>
              <span>(10 am to 10 pm)</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RightSide;