/* eslint-disable @next/next/no-img-element */
import { Collapse } from 'antd';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { RiLiveLine } from 'react-icons/ri';
import { useStateContext } from '../../src/context/ContextProvider';

import { bg_colors, colors } from '../../src/data/data';
import MemberDetails from '../About/MemberDetails';
import AddVideoReview from '../Home/Review/AddVideoReview';
import CustomModal from '../utilities/CustomModal';
import YoutubeEmbed from '../utilities/YoutubeEmbed';
import BannerCourseDetails from './BannerCourseDetails';
import PointsCourseDetails from './PointsCourseDetails';
import StudentReviewCourse from './StudentReviewCourse';

const { Panel } = Collapse;

const CourseDetails = () => {
  const { courseData } = useStateContext();
  const [courseDetails, setCourseDetails] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slug = window.location.href.split('/').slice(-1)[0];
      const item = courseData.find((item) => item.key === slug);
      setCourseDetails(item);
    }
  }, [courseData]);

  const openModal = (item) => {
    setModalData(item);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(courseDetails);

  return (
    <div>
      <div
        style={{ backgroundImage: "url('/banner/course_bg.png')" }}
        className=" bg-no-repeat bg-cover"
      >
        <BannerCourseDetails courseDetails={courseDetails} />
      </div>

      <div className="max-w-4xl mx-auto mt-10 mb-5">
        <YoutubeEmbed
          embedId={courseDetails?.youtube_video}
          width="100%"
          height="500px"
        />
      </div>

      {/* NOTE: POINTS Course details */}
      <PointsCourseDetails courseDetails={courseDetails} />

      {/* NOTE: COURSE INCLUDED ITEMS */}
      {/* <div className="bg-[#101828] p-3 md:p-8 pl-5 md:pl-12 font-normal text-[#eaecf0] rounded-lg mt-8">
            <div className="flex items-center gap-4">
              <div className="text-base">During the whole course</div>
              <div className="grow h-[.5px] bg-[#eaecf0]" />
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:gap-x-12 mt-6">
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
          </div> */}
      <div className="max-w-6xl mx-auto">
        {/* NOTE: COURSE MODULE  */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-3 font-heading">
            Course Module
          </h2>
          <div className="h-[.5px] w-[100%] bg-slate-300" />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {courseDetails?.courseModule?.map((item, index) => (
              <div
                key={item.id}
                className="border rounded self-start"
                style={{ backgroundColor: bg_colors[index] }}
              >
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
                          <h2 className="text-xl font-bold leading-6 ">
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
                    <div
                      className="text-base font-normal border-t-1 pt-4"
                      // style={{ backgroundColor: bg_colors[index] }}
                    >
                      {item.lessons.map((panelLesson, lessonIndex) => (
                        <Collapse
                          collapsible="header"
                          expandIconPosition="end"
                          defaultActiveKey={['1']}
                          key={panelLesson.id}
                          className="my-2"
                        >
                          <Panel
                            className="text-lg font-semibold mb-2"
                            header={
                              <p className="text-base mb-0 font-medium">
                                {<strong>{lessonIndex + 1}.</strong>}{' '}
                                {panelLesson.title}
                              </p>
                            }
                          >
                            <div className="flex flex-col justify-between px-4 py-2">
                              {panelLesson?.topics?.map((topic, topicIndex) => (
                                <p
                                  key={topic.id}
                                  className="text-base font-normal"
                                >
                                  <strong>{topicIndex + 1}.</strong>{' '}
                                  {topic.name}
                                </p>
                              ))}
                            </div>
                          </Panel>
                        </Collapse>
                      ))}
                    </div>
                  </Panel>
                </Collapse>
              </div>
            ))}
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
            <p className="text-2xl mt-12 capitalize">Who this course is for</p>
            <div
              className="text-lg font-normal"
              dangerouslySetInnerHTML={{
                __html: courseDetails?.who_is_the_course_for,
              }}
            />

            <p className="text-2xl mt-12 capitalize">course benefit</p>
            <div
              className="font-normal text-lg capitalize"
              dangerouslySetInnerHTML={{
                __html: courseDetails?.after_course_benefit,
              }}
            />
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

            {courseDetails?.instructors?.map((item) => (
              <div
                key={item.id}
                className="bg-white mt-4 border-l-[3px] border-[#4478ff] rounded-[6px] shadow-lg py-3 px-4 cursor-pointer flex items-center gap-4 hover:bg-[#eaecf0]"
                onClick={() => openModal(item)}
              >
                <img
                  src={item.photoUrl}
                  className="w-[60px] h-[60px] rounded-full"
                  alt=""
                />
                <div>
                  <p className="m-0 text-xl text-[#1d2939] font-bold">
                    {item.profileName}
                  </p>
                  <p className="m-0 text-base text-[#475467]">
                    {item.jobTitle}
                  </p>
                </div>
              </div>
            ))}
            <CustomModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
              <MemberDetails data={modalData} closeModal={closeModal} />
            </CustomModal>
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
      <div className="py-10">
        <AddVideoReview coursePage={true} />
      </div>
      <StudentReviewCourse courseDetails={courseDetails} />
    </div>
  );
};

export default CourseDetails;
