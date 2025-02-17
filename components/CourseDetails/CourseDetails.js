import { Collapse } from 'antd';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../src/context/ContextProvider';

import { Monitor, Video } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { bg_colors, colors } from '../../src/data/data';
import MemberDetails from '../About/MemberDetails';
import AddVideoReview from '../Home/Review/AddVideoReview';
import LoginModal from '../Login/LoginModal';
import CustomModal from '../utilities/CustomModal';
import YoutubeEmbed from '../utilities/YoutubeEmbed';
import BannerCourseDetails from './BannerCourseDetails';
import PointsCourseDetails from './PointsCourseDetails';
import PopupInterested from './PopupInterested';
import StudentReviewCourse from './StudentReviewCourse';

const { Panel } = Collapse;

const CourseDetails = () => {
  const [innerWidth, setInnerWidth] = useState();
  const { courseData, findCurrentUser } = useStateContext();
  const [courseDetails, setCourseDetails] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openPanels, setOpenPanels] = useState({}); // Track the state of each panel

  // Toggle function for individual panels
  const togglePanel = (id) => {
    setOpenPanels((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the specific panel's state
    }));
  };

  // Function to handle popup close
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Function to handle registration action
  const handleRegister = () => {
    setLoginModalIsOpen(true);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 15000); // 20 seconds

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = courseData.find((item) => item.key === slug);
      setCourseDetails(item);
    }
  }, [slug, courseData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInnerWidth(window.innerWidth);
    }
  }, [courseData]);

  const openModal = (item) => {
    setModalData(item);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setLoginModalIsOpen(false);
  };

  if (!['Registration Going on', 'Running'].includes(courseDetails?.status)) {
    return null;
  }

  const hasDiscount =
    courseDetails?.discounted_price !== '0' && courseDetails?.discounted_price;

  console.log(courseDetails?.discounted_price);

  return (
    <div>
      {isPopupOpen && findCurrentUser === undefined && (
        <PopupInterested
          onClose={handleClosePopup}
          onRegister={handleRegister}
        />
      )}
      <LoginModal
        modalIsOpen={loginModalIsOpen}
        closeModal={() => {
          closeModal();
        }}
      />
      <div
        style={{ backgroundImage: "url('/banner/course_bg.png')" }}
        className=" bg-no-repeat bg-cover"
      >
        <BannerCourseDetails courseDetails={courseDetails} />
      </div>

      {courseDetails?.youtube_video && (
        <div className="max-w-4xl mx-auto mt-10 mb-5 px-3">
          <YoutubeEmbed
            embedId={courseDetails?.youtube_video}
            width="100%"
            height={innerWidth <= 768 ? '300px' : '500px'}
          />
        </div>
      )}

      {/* NOTE: POINTS Course details */}
      <PointsCourseDetails courseDetails={courseDetails} />

      <div className="max-w-6xl mx-auto px-3">
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
                className="border rounded-lg self-start relative"
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
                      <div
                        className="flex items-center gap-4 "
                        onClick={() => togglePanel(item.id)}
                      >
                        <div
                          style={{ backgroundColor: colors[index] }}
                          className={`p-2 rounded-lg text-white text-center text-base font-normal`}
                        >
                          <p className="m-0">Module</p>
                          <p className="m-0 font-bold">{item.moduleNumber}</p>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold leading-6">
                            {openPanels[item.id]
                              ? item.moduleName
                              : truncateString(item.moduleName)}
                          </h2>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-[13px] font-normal">
                              <Video className="w-5" /> &nbsp;
                              <p className="m-0">
                                {' '}
                                <span className="font-semibold">
                                  {item.liveClassNumber}
                                </span>{' '}
                                Live Classes
                              </p>
                            </div>
                            <div className="flex items-center text-[13px] font-normal">
                              <Monitor className="w-4" /> &nbsp;
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
                    <div className="text-base font-normal border-t-1 pt-4">
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
            <div
              className="text-lg font-normal leading-body"
              dangerouslySetInnerHTML={{ __html: courseDetails?.details }}
            />
          </div>
        </div>

        {/* NOTE: DRIVE LINK, COURSE BENEFIT  */}
        <div className="mt-16">
          <div className="mt-4">
            {courseDetails?.drive_link && (
              <>
                <h2 className="text-3xl font-bold mb-3 font-heading">
                  Full Course Details Link
                </h2>

                {findCurrentUser === undefined ? (
                  <button
                    onClick={() => setIsPopupOpen(true)}
                    className="bg-[#1f0835] text-[#f9fbff] py-[12px] px-[24px] rounded-[8px] hover:opacity-[0.9] transition-all"
                  >
                    See More Details Module
                  </button>
                ) : (
                  <button className="bg-[#1f0835] text-[#f9fbff] py-[12px] px-[24px] rounded-[8px] hover:opacity-[0.9] transition-all">
                    <Link
                      href={courseDetails?.drive_link}
                      className="text-[#f9fbff] visited:text-[#f9fbff]"
                      target="_blank"
                    >
                      See More Details Module
                    </Link>
                  </button>
                )}
              </>
            )}
            <h2 className="text-3xl font-bold mb-3 font-heading capitalize mt-16">
              Who this course is for
            </h2>
            <div
              className="text-lg font-normal leading-body"
              dangerouslySetInnerHTML={{
                __html: courseDetails?.who_is_the_course_for,
              }}
            />

            <h2 className="text-3xl font-bold mb-3 font-heading capitalize mt-10">
              course benefit
            </h2>
            <div
              className="font-normal text-lg capitalize leading-body"
              dangerouslySetInnerHTML={{
                __html: courseDetails?.after_course_benefit,
              }}
            />
          </div>
        </div>

        {/* NOTE: ABOUT INSTRUCTOR */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-3 font-heading capitalize">
            Instructors
          </h2>
          <div className="h-[.5px] w-[100%] bg-slate-300" />

          <div className="mt-8 bg-[#fff1e9] px-8 py-5 border-l-[3px] border-[#fd6506] rounded-[8px] shadow-lg overflow-hidden">
            <div className="flex items-center gap-2">
              <Image
                width={500}
                height={300}
                src="/icon/medal.png"
                className="w-12"
                alt=""
              />
              <h2 className="text-lg font-bold">Lead Instructor</h2>
            </div>

            {courseDetails?.instructors?.map((item) => (
              <div
                key={item.id}
                className="bg-white mt-4 border-l-[3px] border-[#4478ff] rounded-[6px] shadow-lg py-3 px-4 cursor-pointer flex items-center gap-4 hover:bg-[#eaecf0]"
                onClick={() => openModal(item)}
              >
                <Image
                  width={500}
                  height={300}
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
            <CustomModal
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              setModalIsOpen={setModalIsOpen}
            >
              <MemberDetails data={modalData} closeModal={closeModal} />
            </CustomModal>
          </div>
        </div>
        {/* NOTE: REQUIREMENTS */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-3 font-heading capitalize">
            Requirements
          </h2>
          <div className="mt-3 mb-8 h-[.5px] w-[100%] bg-slate-300" />
          <p className="text-lg font-normal pb-10">
            Laptop/desktop with internet connection
          </p>
        </div>

        {/* NOTE: MOBILE PRICE */}

        <div className="">
          <div className="relative overflow-hidden rounded-xl bg-white border border-blue-100 p-4 shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24">
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 rounded-tr-xl opacity-10 border-blue-500" />
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex flex-col">
                <h2 className="text-xl md:text-3xl font-bold mb-3 font-heading capitalize">
                  Course Fee
                </h2>

                <div className="flex items-center flex-wrap gap-2">
                  {hasDiscount ? (
                    <>
                      <span className="text-rose-500 font-medium text-lg line-through decoration-2">
                        <strong>৳</strong> {courseDetails?.price}
                      </span>
                      <span className="text-blue-600 font-bold text-2xl">
                        <strong>৳</strong> {courseDetails?.discounted_price}{' '}
                      </span>
                      <span className="text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded-full">
                        {Math.round(
                          (1 -
                            parseInt(courseDetails?.discounted_price) /
                              parseInt(courseDetails?.price)) *
                            100,
                        )}
                        % OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-blue-600 font-bold text-2xl">
                      <strong>৳</strong> {courseDetails?.price}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -left-4 -bottom-4 w-24 h-24 blur-xl bg-blue-50 rounded-full opacity-50" />
            <div className="absolute -right-4 -top-4 w-24 h-24 blur-xl bg-blue-50 rounded-full opacity-50" />
          </div>
        </div>

        {/* NOTE: HELP */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-3 font-heading capitalize">
            Help
          </h2>
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

function truncateString(str) {
  if (str.length > 30) {
    return str.slice(0, 30) + '...';
  }
  return str;
}
