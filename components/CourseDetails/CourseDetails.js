/* eslint-disable @next/next/no-img-element */
import { Collapse } from 'antd';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { BsCalendarDay, BsClock } from 'react-icons/bs';
import { GoCalendar } from 'react-icons/go';
import { RiLiveLine } from 'react-icons/ri';
import { useStateContext } from '../../src/context/ContextProvider';

import { colors } from '../../src/data/data';
import RightSide from './RightSide';
const { Panel } = Collapse;

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

  console.log(courseDetails);

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
                <p className="m-0 text-base text-primary">Evaluation Test</p>
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
          <div className="mt-4">
            <p
              className="text-lg font-normal"
              dangerouslySetInnerHTML={{ __html: courseDetails?.details }}
            />
          </div>
        </div>

        {/* NOTE: COURSE MODULE  */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-3 font-heading">
            Course Module
          </h2>
          <div className="h-[.5px] w-[100%] bg-slate-300" />
          <div className="mt-4">
            {courseDetails?.courseModule?.map((item, index) => (
              <div key={item.id} className="border rounded my-3">
                <Collapse
                  collapsible="header"
                  expandIconPosition="end"
                  ghost
                  defaultActiveKey={['1']}
                >
                  <Panel
                    className="text-lg font-semibold"
                    header={
                      <div className="flex items-center gap-4 ">
                        <div
                          style={{ backgroundColor: colors[index] }}
                          className={`p-2 rounded-lg text-white text-center text-base font-normal`}
                        >
                          <p className="m-0">Module</p>
                          <p className="m-0 font-bold">{item.moduleNumber}</p>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">
                            {item.moduleName}
                          </h2>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-[13px] font-normal">
                              <RiLiveLine /> &nbsp;{' '}
                              <p className="m-0">
                                {' '}
                                <span className="font-semibold">
                                  {item.liveClassNumber}
                                </span>{' '}
                                Live Classes
                              </p>
                            </div>
                            <div className="flex items-center text-[13px] font-normal">
                              <AiOutlineFundProjectionScreen /> &nbsp;
                              <p className="m-0">
                                {' '}
                                <span className="font-semibold">
                                  {item.projectNumber}
                                </span>{' '}
                                Projects
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    key={item.id}
                  >
                    <div className="text-base font-normal border-t-1 px-4 pt-4">
                      {item.lessons.map((panelLesson) => (
                        <p key={panelLesson.id}>{panelLesson.title}</p>
                      ))}
                    </div>
                  </Panel>
                </Collapse>
              </div>
            ))}
          </div>
        </div>

        {/* NOTE: DRIVE LINK, COURSE BENEFIT  */}
        <div className="mt-16">
          <div className="mt-4">
            {courseDetails?.drive_link && (
              <>
                <p className="text-2xl mt-12 capitalize">
                  Full Course Details Link
                </p>

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
            <p className="text-2xl mt-12 capitalize">
              For whom this course for
            </p>
            <p className="text-lg font-normal">
              - {courseDetails?.who_is_the_course_for}
            </p>
            <p className="text-2xl mt-12 capitalize">course benefit</p>
            <p className="text-lg font-normal capitalize">
              - Certificate <br />
              - Job Placement Support <br />- Communication with alumni <br />-
              Internship <br />- After course support
            </p>
          </div>
        </div>

        {/* NOTE: ABOUT INSTRUCTOR */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-3">Instructor</h2>
          <div className="h-[.5px] w-[100%] bg-slate-300" />

          <div className="mt-8 bg-[#fff1e9] px-8 py-5 border-l-[3px] border-[#fd6506] rounded-[8px] shadow-lg overflow-hidden">
            <div className="flex items-center gap-2">
              <img src="/icon/medal.png" className="w-12" alt="" />
              <h2 className="text-lg font-bold">Lead Instructor</h2>
            </div>

            {courseDetails?.instructor?.map((item) => (
              <div
                key={item.id}
                className="bg-white mt-4 border-l-[3px] border-[#4478ff] rounded-[6px] shadow-lg py-3 px-4 cursor-pointer flex items-center gap-4 hover:bg-[#eaecf0]"
              >
                <img
                  src={item.photoUrl}
                  className="w-[60px] h-[60px] rounded-full"
                  alt=""
                />
                <div>
                  <p className="m-0 text-xl text-[#1d2939] font-bold">
                    {item.instructorName}
                  </p>
                  <p className="m-0 text-base text-[#475467]">
                    {item.jobTitle}
                  </p>
                </div>
              </div>
            ))}
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
      <RightSide courseDetails={courseDetails} />
    </div>
  );
};

export default CourseDetails;
