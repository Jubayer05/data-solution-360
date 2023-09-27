/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiShareAlt } from 'react-icons/bi';
import {
  BsCalendarDay,
  BsCheck2Circle,
  BsClock,
  BsTelephone,
} from 'react-icons/bs';
import { GoCalendar } from 'react-icons/go';
import { ImClock } from 'react-icons/im';
import { useStateContext } from '../../src/context/ContextProvider';

const CourseDetails = () => {
  const { courseData } = useStateContext();
  const [courseDetails, setCourseDetails] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slug = window.location.href.split('/').slice(-1)[0];
      const item = courseData.find((item) => item.key === slug);
      setCourseDetails(item);
    }
  }, [courseData]);

  console.log(courseData);

  return (
    <div className="flex items-start flex-col-reverse md:flex-row max-w-6xl mx-auto font-bold font-heading">
      {/* NOTE: LEFT SIDE */}
      {/* TODO: Make different files inside courseDetails folder and distribute the components for better code management */}
      <div className="pt-32 p-5 flex-[.58 1] w-[100%] md:w-[60%]">
        <h2 className="text-4xl md:text-5xl mb-6 -mt-20 font-[700] text-[#101828]">
          {courseDetails?.title}
        </h2>
        <p className="font-medium text-base">
          {courseDetails?.short_description}
        </p>

        {/* NOTE: ORIENTATION SECTION */}
        <div className="flex items-center bg-[rgb(255,241,233)] px-4 py-3 mt-10 rounded">
          <img className="w-[60px] mr-4" src="/course/webinar.png" alt="" />
          <div>
            <span className="cursor-pointer font-heading">
              Free Orientation Class
            </span>
            <div className="flex items-center text-base mt-1">
              <GoCalendar />
              {/* TODO: Make it simple date with day name */}
              <span className="ml-1.5">{courseDetails?.orientation_class}</span>
            </div>
          </div>
          <div className="ml-auto">
            <button className="bg-[#1f0835] text-[#f9fbff] w-full py-[12px] px-[24px] rounded-[8px] hover:opacity-[0.9] transition-all">
              Book Your Seat Now
            </button>
          </div>
        </div>

        {/* NOTE: COURSE DETAILS (BATCH, STARTING, DAY, TIME) */}
        <div className="border-l-2 mt-6 px-2 py-4 border-[#ffa36f] flex items-center gap-1 md:gap-6">
          <div className="pl-3 pr-2">
            <div className="bg-[#ff8c4b] text-white py-1.5 px-2 text-xs rounded">
              <span>{courseDetails?.batch_no}</span>
            </div>
          </div>
          <div className="bg-[#d5caca] w-[2px] h-[40px]" />
          <div className="px-1 md:px-3">
            <div className="flex items-center text-xs pb-1.5">
              <GoCalendar className="text-[#ff8c4b] text-base" />
              <span className="ml-1.5 cursor-pointer">Start Date</span>
            </div>
            <span>{courseDetails?.main_class_starting_date}</span>
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

        {/* NOTE: COURSE INCLUDED ITEMS */}
        <div className="bg-[#101828] p-3 md:p-8 pl-5 md:pl-12 font-normal text-[#eaecf0] rounded-lg mt-8">
          <div className="flex items-center gap-4">
            <div className="text-base">During the whole course</div>
            <div className="grow h-[.5px] bg-[#eaecf0]" />
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:gap-x-12 mt-6">
            {/* NOTE: 1 */}
            <div className="relative bg-[#1d2939] py-3 pr-4 pl-8 border-b-2 border-l-2 rounded-[4px] border-[#475467]">
              <img
                className="w-[40px] absolute top-[20%] left-[-8%]"
                src="/course/seo.png"
                alt=""
              />
              <div>
                <p className="m-0 text-base text-[#12b76a]">Evaluation Test</p>
                <p className="m-0">Test yourself for regular exam</p>
              </div>
            </div>
            {/* NOTE: 2 */}
            <div className="relative bg-[#1d2939] py-3 pr-4 pl-8 border-b-2 border-l-2 rounded-[4px] border-[#475467]">
              <img
                className="w-[40px] absolute top-[20%] left-[-8%]"
                src="/course/support.png"
                alt=""
              />
              <div>
                <p className="m-0 text-base text-[#6993ff]">Support Class</p>
                <p className="m-0">Solve your problems regularly</p>
              </div>
            </div>
            {/* NOTE: 3 */}
            <div className="relative bg-[#1d2939] py-3 pr-4 pl-8 border-b-2 border-l-2 rounded-[4px] border-[#475467]">
              <img
                className="w-[40px] absolute top-[20%] left-[-8%]"
                src="/course/growth.png"
                alt=""
              />
              <div>
                <p className="m-0 text-base text-[#ff8c4b]">
                  Progress Tracking
                </p>
                <p className="m-0">Keep yourself always on track</p>
              </div>
            </div>
            {/* NOTE: 4 */}
            <div className="relative bg-[#1d2939] py-3 pr-4 pl-8 border-b-2 border-l-2 rounded-[4px] border-[#475467]">
              <img
                className="w-[40px] absolute top-[20%] left-[-8%]"
                src="/course/portfolio.png"
                alt=""
              />
              <div>
                <p className="m-0 text-base text-[#ffab00]">
                  Scope for Internship
                </p>
                <p className="m-0">For best performers only</p>
              </div>
            </div>
          </div>
        </div>

        {/* NOTE: ABOUT COURSE  */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-3 font-heading">About Course</h2>
          <div className="h-[.5px] w-[100%] bg-slate-300" />

          {/* <div
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: courseDetails?.details }}
          /> */}
          {/* TODO: Remove it letter */}
          <div className="mt-4">
            <p
              className="text-lg font-normal"
              dangerouslySetInnerHTML={{ __html: courseDetails?.details }}
            />
            {courseDetails?.drive_link && (
              <>
                <p className="text-2xl mt-12">Full Course Details Link</p>

                <button className="bg-[#1f0835] text-[#f9fbff] py-[12px] px-[24px] rounded-[8px] hover:opacity-[0.9] transition-all">
                  <Link
                    href={courseDetails?.drive_link}
                    className="text-[#f9fbff] visited:text-[#f9fbff]"
                    target="_blank"
                  >
                    See More Details Module
                  </Link>
                </button>
              </>
            )}
            <p className="text-2xl mt-12">Who is this course for?</p>
            <p className="text-lg font-normal">
              - {courseDetails?.who_is_the_course_for}
            </p>
            <p className="text-2xl mt-12">After course benefit</p>
            <p className="text-lg font-normal">
              - {courseDetails?.after_course_benefit}
            </p>
          </div>
        </div>

        {/* NOTE: ABOUT INSTRUCTOR */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-3">Instructor</h2>
          <div className="h-[.5px] w-[100%] bg-slate-300" />

          <div className="mt-8 border-l-[3px] border-[#4478ff] rounded-[4px] shadow-lg py-3 px-4 cursor-pointer flex items-center gap-4 hover:bg-[#eaecf0]">
            <img
              src="/team/sakib.jpg"
              className="w-[60px] h-[60px] rounded-full"
              alt=""
            />
            <div>
              <p className="m-0 text-xl text-[#1d2939] font-bold">
                Sakib Tarafder
              </p>
              <p className="m-0 text-base text-[#475467]">
                CEO at Data Solution - 360
              </p>
            </div>
          </div>
        </div>
        {/* NOTE: REQUIREMENTS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-3">Requirements</h2>
          <div className="mt-3 mb-8 h-[.5px] w-[100%] bg-slate-300" />
          <p className="text-lg font-normal pb-10">
            Laptop/desktop with internet connection
          </p>
        </div>

        {/* NOTE: HELP */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3">Help</h2>
          <div className="mt-3 mb-8 h-[.5px] w-[100%] bg-slate-300" />
          <p className="text-lg font-normal cursor-pointer">
            For any batch related information call{' '}
            <span className="font-bold underline">01870106460</span> (10 am to
            10 pm)
          </p>
        </div>
      </div>
      {/* NOTE: RIGHT SIDE */}
      <div className="my-2 p-4 md:p-0 flex-grow-[1] md:flex-grow-[.42] pb-3 shrink w-[100%] md:w-[40%] static md:sticky top-[-185px]">
        <div className="mb-3">
          <img
            src={courseDetails?.img}
            alt=""
            className="rounded-md w-[100%] h-[260px]"
          />
        </div>

        <div className="border-1 rounded-md">
          {/* NOTE: RIGHT HEADER */}
          <div className="flex items-center justify-center gap-4 border-b-1 py-4">
            <div className="flex bg-[#fff1e9] text-[#1d2939] px-[6px] py-[10px] items-center justify-center rounded-[4px]">
              <ImClock className="text-[rgb(223,97,52)] mr-[6px]" />
              <span className="text-sm font-[700]">
                {new Date(courseDetails?.main_class_starting_date).getTime() >=
                new Date().getTime()
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
              <span className="flex items-center text-[orange] mr-2 cursor-pointer">
                <BsTelephone className="mr-2" />
                Call Us 01870106460
              </span>
              <span>(10 am to 10 pm)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
