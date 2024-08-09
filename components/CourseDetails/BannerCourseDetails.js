import React from 'react';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

import { BsCalendarDay, BsClock } from 'react-icons/bs';
import { GoCalendar } from 'react-icons/go';

import { Breadcrumb } from 'antd';
import { BiShareAlt } from 'react-icons/bi';

const BannerCourseDetails = ({ courseDetails }) => {
  return (
    <div className="flex items-start flex-col-reverse md:flex-row max-w-7xl mx-auto font-bold font-heading">
      {/* NOTE: LEFT SIDE */}
      {/* TODO: Make different files inside courseDetails folder and distribute the components for better code management */}
      <div className="pt-14 p-5 flex-[.65 1] w-[100%] md:w-[65%]">
        <Breadcrumb
          className=""
          separator=""
          items={[
            {
              href: '/',
              title: (
                <span className="text-lg font-medium text-blue-500">Home</span>
              ),
            },
            {
              type: 'separator',
            },
            {
              title: (
                <span className="text-lg font-normal text-gray-500">
                  {courseDetails?.title}
                </span>
              ),
            },
          ]}
        />
        <h2 className="text-4xl md:text-4xl mb-3 mt-2 font-[700] text-[#101828]">
          {courseDetails?.title}
        </h2>
        <p className="font-normal text-lg ">
          {courseDetails?.short_description}
        </p>

        <div className="h-[1px] w-full bg-slate-300 mt-3 mb-4" />
        {/* NOTE: BEST OUTLINE */}
        <dir className="grid grid-cols-2 md:grid-cols-4">
          <div>
            <h2 className="text-[28px] text-center">
              {courseDetails?.module_number}
            </h2>
            <p className="text-[#222] font-normal text-center">Modules</p>
          </div>
          <div>
            <h2 className="text-[28px] text-center ">
              {courseDetails?.live_class_number}+
            </h2>
            <p className="text-[#222] font-normal text-center">Live Class</p>
          </div>
          <div>
            <h2 className="text-[28px] text-center ">
              {courseDetails?.project_number}
            </h2>
            <p className="text-[#222] font-normal text-center">
              Real World Project
            </p>
          </div>

          <div>
            <h2 className="text-[28px] text-center ">Community</h2>
            <p className="text-[#222] font-normal text-center">
              Large DS-360 Community
            </p>
          </div>
          <div></div>
          <div></div>
        </dir>
        <div className="h-[1px] w-full bg-slate-300 mt-4 mb-3" />

        {/* NOTE: ORIENTATION SECTION */}
        {courseDetails?.status !== 'Upcoming' &&
          courseDetails?.orientation_class !== '-' && (
            <div className="flex items-center bg-[rgb(255,241,233)] px-4 py-3 mt-10 rounded">
              <img className="w-[60px] mr-4" src="/course/webinar.png" alt="" />
              <div>
                <span className="cursor-pointer font-heading">
                  Free Orientation Class
                </span>
                <div className="flex items-center text-base mt-1">
                  <GoCalendar />
                  {/* TODO: Make it simple date with day name */}
                  <span className="ml-1.5">
                    {courseDetails?.orientation_class}
                  </span>
                </div>
              </div>
              <div className="ml-auto">
                <Link href={`${courseDetails?.join_link}`} target="_blank">
                  <button className="bg-[#1f0835] text-[#f9fbff] w-full py-[12px] px-[24px] rounded-[8px] hover:opacity-[0.9] transition-all">
                    Book Your Seat Now
                  </button>
                </Link>
              </div>
            </div>
          )}

        {/* NOTE: COURSE DETAILS (BATCH, STARTING, DAY, TIME) */}
        {courseDetails?.status !== 'Upcoming' && (
          <div className="border-l-2 mt-6 px-2 py-4 border-[#ffa36f] flex items-center flex-wrap gap-x-2 gap-y-4 md:gap-6">
            <div className="pl-3 pr-2">
              <div className="bg-[#ff8c4b] text-white py-1.5 px-2 text-xs rounded">
                <span>{courseDetails?.batch_no}</span> Batch
              </div>
            </div>
            <div className="bg-[#d5caca] w-[2px] h-[40px]" />
            <div className="px-1 md:px-3">
              <div className="flex items-center text-xs pb-1.5">
                <GoCalendar className="text-[#ff8c4b] text-base" />
                <span className="ml-1.5 cursor-pointer">Start Date</span>
              </div>
              <span className=" capitalize">
                {courseDetails?.main_class_starting_date}
              </span>
            </div>
            <div className="bg-[#d5caca] w-[1px] h-[40px]" />
            <div className="px-1 md:px-3">
              <div className="flex items-center text-xs pb-1.5">
                <BsCalendarDay className="text-[#ff8c4b] text-base" />
                <span className="ml-1.5 cursor-pointer">Class Days</span>
              </div>
              <span>
                {' '}
                {courseDetails?.class_days?.map((item, index) => (
                  <span key={item}>
                    {item}
                    {index !== courseDetails?.class_days.length - 1 && `, `}
                  </span>
                ))}{' '}
              </span>
            </div>
            <div className="bg-[#d5caca] w-[1px] h-[40px]" />
            <div className="px-1 md:px-3">
              <div className="flex items-center text-xs pb-1.5">
                <BsClock className="text-[#ff8c4b] text-base" />
                <span className="ml-1.5 cursor-pointer">Class Time</span>
              </div>
              {/* <span>রাত ৯:০০ - রাত ১০:৩০</span> */}
              <span>{courseDetails?.class_time}</span>
            </div>
          </div>
        )}
      </div>
      {/* NOTE: RIGHT SIDE */}
      <div className="my-2 p-4 md:p-0 flex-grow-[1] md:flex-grow-[.42] pb-3 shrink w-[100%] md:w-[40%] static md:sticky top-[-360px]">
        <div className="mb-3 bg-white px-1.5 py-1.5 rounded-xl w-[90%] mx-auto md:ml-auto  mt-5">
          <img
            src={courseDetails?.img}
            alt=""
            className="rounded-xl w-[100%]"
          />
          {courseDetails?.status && (
            <div className="py-4 px-5">
              <div className="flex items-center">
                {courseDetails?.status === 'Registration Going on' && (
                  <div>
                    {courseDetails?.discounted_price !== '0' ||
                    !courseDetails?.discounted_price ? (
                      <span className="text-[orangered] font-bold text-lg">
                        <strike>{courseDetails?.price}/-</strike>
                      </span>
                    ) : (
                      <span className="text-[#1d2939] font-bold text-3xl">
                        {courseDetails?.price}
                        /-
                      </span>
                    )}
                  </div>
                )}
                <div className="ml-4">
                  {courseDetails?.discounted_price !== '0' ||
                    (!courseDetails?.discounted_price && (
                      <span className="text-[#1d2939] font-bold text-3xl">
                        {courseDetails?.status === 'Registration Going on'
                          ? courseDetails?.discounted_price
                          : courseDetails?.price}
                        /-
                      </span>
                    ))}
                </div>
                <div className="flex items-center ml-auto border-b-1 cursor-pointer">
                  <BiShareAlt />
                  <span>Share</span>
                </div>
              </div>
              <div>
                <Link href={`${courseDetails?.join_link}`} target="_blank">
                  <button className="bg-primary-bg text-[#f9fbff] w-full py-[12px] px-[24px] rounded-[8px] mt-6 hover:opacity-[0.8] transition-all">
                    Join Live Batch
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* <div className="border-1 rounded-md"> */}
        {/* NOTE: RIGHT HEADER */}
        {/* <div className="flex items-center justify-center gap-4 border-b-1 py-4">
            {courseDetails?.status === 'Registration Going on' && (
              <div className="flex bg-[rgba(255,68,68,0.15)] text-[#1d2939] px-[6px] py-[10px] items-center justify-center rounded-[4px]">
                <ImClock className=" text-[rgb(208,12,28)] mr-[6px]" />
                <span className="text-sm font-[700]">
                  {new Date(
                    courseDetails?.main_class_starting_date,
                  ).getTime() >= new Date().getTime()
                    ? Math.ceil(
                        (new Date(
                          courseDetails?.main_class_starting_date,
                        ).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24),
                      )
                    : 0}{' '}
                  Days Left
                </span>
              </div>
            )}
            <div className="flex bg-[rgba(161,68,255,0.15)] text-[#1d2939] px-[6px] py-[10px] items-center justify-center rounded-[4px]">
              <ImClock className="text-[rgb(120,12,208)] mr-[6px]" />
              <span className="text-sm font-[700]">
                Total Seat {courseDetails?.total_seat_number}
              </span>
            </div>
          </div> */}

        {/* NOTE: PRICE & BUTTON */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default BannerCourseDetails;
