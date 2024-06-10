/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IoIosPeople } from 'react-icons/io';
import Typewriter from 'typewriter-effect';

import Link from 'next/link';
import { ImClock } from 'react-icons/im';

const CourseItem = ({ item, upcoming }) => {
  return (
    <div
      className="w-full mx-auto rounded-lg overflow-hidden sm:mx-2 hover:border-[#676767] 
    transition-border duration-300 cursor-pointer relative bg-white border"
    >
      <div className="w-[80px] md:w-[120px] h-[80px] md:h-[120px] bg-[orangered] absolute -rotate-45 -left-10 md:-left-16 -top-10 md:-top-16 flex justify-center items-end">
        <div>
          {item?.status == 'Registration Going on' ? (
            <p className="mb-1 text-[8px] md:text-[11px] leading-[1] text-white font-semibold text-center">
              Registration <br /> Going on
            </p>
          ) : (
            <p className="mb-2 text-[10px] md:text-[13px] text-white font-semibold">
              {item?.status}
            </p>
          )}
        </div>
      </div>
      <Link href={`/course-details/${item.key}`}>
        <img src={item.img} alt="" className="w-full h-[140px] md:h-[260px]" />
        <div className="rounded-lg rounded-t-none flex flex-col h-[calc(100%-140px)] md:h-[calc(100%-260px)]">
          <div className="p-0.5 md:p-2 border-b-1 border-[#d6dae1] flex items-center flex-wrap">
            <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded">
              {upcoming ? (
                <span className="text-[#101828] text-[10px] md:text-[12px] block -mt-[1px]">
                  Upcoming
                </span>
              ) : (
                <span className="text-[#101828] text-[10px] md:text-[12px] block -mt-[1px]">
                  Batch <strong>{item?.batch_no}</strong>
                </span>
              )}
            </div>
            <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded flex items-center gap-1 text-[#101828]">
              <IoIosPeople />

              <span className="text-[10px] md:text-[12px] block -mt-[1px]">
                Total Seat <strong>{item?.total_seat_number}</strong>
              </span>
            </div>
            {upcoming ? (
              ''
            ) : (
              <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded flex items-center gap-1 text-[#101828]">
                <ImClock />
                <span className="text-[10px] md:text-[12px] -mt-[1px]">
                  <strong>
                    {' '}
                    {new Date(item?.main_class_starting_date).getTime() >=
                    new Date().getTime()
                      ? Math.ceil(
                          (new Date(item?.main_class_starting_date).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )
                      : 0}{' '}
                  </strong>
                  Days Left
                </span>
              </div>
            )}
          </div>
          <p
            className="flex-1 text-base leading-5 md:text-lg font-bold mb-1.5 mt-2 text-[#140342]
          px-1 md:px-4 hover:text-primary"
          >
            {item.title}
          </p>
          {item?.status == 'Registration Going on' && (
            <div className="text-xl">
              <p
                className=" flex-1 text-[13px] md:text-lg font-bold mb-1.5 md:mt-2 
          px-1 md:px-4 text-[#39b94a] text-center"
              >
                <Typewriter
                  options={{
                    strings: ['Registration Going on', 'Registration Going on'],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 15,
                  }}
                />
              </p>
            </div>
          )}
          <div
            className="flex justify-end font-medium text-[14px] flex-wrap text-[#4F547B]
            bg-[#f9f9fa] py-4 px-2"
          >
            <button
              className="bg-[#113f5a] text-[#f9fbff] py-[6px] md:py-[10px] px-[16px] md:px-[24px] rounded-[8px] text-[12px] md:text-sm
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
