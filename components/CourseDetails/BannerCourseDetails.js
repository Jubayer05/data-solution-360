import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { GoCalendar } from 'react-icons/go';

import { Breadcrumb, Spin } from 'antd';
import { BookOpen, Calendar, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import { BiShareAlt } from 'react-icons/bi';
import Swal from 'sweetalert2';
import firebase from '../../firebase';
import { useStateContext } from '../../src/context/ContextProvider';
import { loadData } from '../../src/hooks/loadData';

const BannerCourseDetails = ({ courseDetails }) => {
  const { findCurrentUser } = useStateContext();
  const [courseDataBatch, setCourseDataBatch] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch);
  }, []);

  const currentCourse = useMemo(() => {
    return courseDataBatch.find(
      (course) => course.unique_batch_id === courseDetails?.unique_batch_id,
    );
  }, [courseDataBatch, courseDetails]);

  console.log(courseDetails?.unique_batch_id);
  console.log(currentCourse);

  const handleJoinNow = useCallback(() => {
    if (!findCurrentUser) {
      Swal.fire('Warning', 'Please login first.', 'warning');
    } else {
      if (currentCourse?.enrolled_students) {
        if (
          !currentCourse.enrolled_students.includes(findCurrentUser.student_id)
        ) {
          Swal.fire({
            title: 'Do you want to join the course?',
            text: 'Click "Yes" to join the course.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Join the course',
          }).then((result) => {
            if (result.isConfirmed) {
              const updatedCourse = {
                ...currentCourse,
                enrolled_students: [
                  ...currentCourse.enrolled_students,
                  findCurrentUser.student_id,
                ],
              };
              db.collection('course_data_batch')
                .doc(currentCourse.id)
                .update(updatedCourse)
                .then(() => {
                  setCourseDataBatch((prevBatch) =>
                    prevBatch.map((batch) =>
                      batch.id === currentCourse.id ? updatedCourse : batch,
                    ),
                  );
                  Swal.fire(
                    'Success',
                    'Your request to join the course has been recorded. Please wait for approval.',
                    'success',
                  );
                });
            }
          });
        } else {
          Swal.fire(
            'Warning',
            'You have already joined this course.',
            'warning',
          );
        }
      } else {
        Swal.fire('Warning', 'Enrollment has not started yet.', 'warning');
      }
    }
  }, [currentCourse, findCurrentUser, db]);

  if (!courseDetails || courseDetails.status === 'Upcoming') {
    return null;
  }

  const courseInfo = [
    {
      label: 'Batch Number',
      value: courseDetails.batch_no,
      icon: Users,
    },
    {
      label: 'Start Date',
      value: courseDetails.main_class_starting_date,
      icon: Calendar,
    },
    {
      label: 'Class Days',
      value: courseDetails.class_days?.join(', '),
      icon: BookOpen,
    },
    {
      label: 'Class Time',
      value: courseDetails.class_time,
      icon: Clock,
    },
  ];

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
                  {courseDetails?.item_name}
                </span>
              ),
            },
          ]}
        />
        <h2 className="text-4xl md:text-4xl mb-3 mt-2 font-[700] text-[#101828]">
          {courseDetails?.item_name}
        </h2>
        <p className="font-normal text-lg ">
          {courseDetails?.short_description}
        </p>

        <div className="h-[1px] w-full bg-slate-300 mt-3 mb-4" />
        {/* NOTE: BEST OUTLINE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          <div className="flex flex-col items-center p-2 sm:p-4">
            <h2 className="text-2xl sm:text-[28px] font-semibold mb-2">
              {courseDetails?.module_number}
            </h2>
            <p className="text-[#222] text-sm sm:text-base font-normal text-center">
              Modules
            </p>
          </div>

          <div className="flex flex-col items-center p-2 sm:p-4">
            <h2 className="text-2xl sm:text-[28px] font-semibold mb-2">
              {courseDetails?.live_class_number}+
            </h2>
            <p className="text-[#222] text-sm sm:text-base font-normal text-center">
              Live Class
            </p>
          </div>

          <div className="flex flex-col items-center p-2 sm:p-4">
            <h2 className="text-2xl sm:text-[28px] font-semibold mb-2">
              {courseDetails?.project_number}
            </h2>
            <p className="text-[#222] text-sm sm:text-base font-normal text-center">
              Real World Project
            </p>
          </div>

          <div className="flex flex-col items-center p-2 sm:p-4">
            <h2 className="text-2xl sm:text-[28px] font-semibold mb-2">
              Community
            </h2>
            <p className="text-[#222] text-sm sm:text-base font-normal text-center">
              Large DS-360 Community
            </p>
          </div>
        </div>
        <div className="h-[1px] w-full bg-slate-300 mt-4 mb-3" />

        {/* NOTE: ORIENTATION SECTION */}
        {courseDetails?.status !== 'Upcoming' &&
          courseDetails?.orientation_class !== '-' && (
            <div className="flex items-center bg-[rgb(255,241,233)] px-4 py-3 mt-10 rounded">
              <Image
                width={500}
                height={300}
                className="w-[60px] mr-4"
                src="/course/webinar.png"
                alt=""
              />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {courseInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <info.icon className="w-5 h-5 text-blue-500" />
                <h3 className="text-sm font-medium text-gray-500">
                  {info.label}
                </h3>
              </div>
              <p className="text-base font-semibold text-gray-900 pl-8">
                {info.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* NOTE: RIGHT SIDE */}
      <div className="my-2 p-4 md:p-0 flex-grow-[1] md:flex-grow-[.42] pb-3 shrink w-[100%] md:w-[40%] static md:sticky top-[-360px]">
        <div className="mb-3 bg-white px-1.5 py-1.5 rounded-xl w-[90%] mx-auto md:ml-auto  mt-5">
          {courseDetails?.img ? (
            <Image
              width={500}
              height={300}
              src={courseDetails?.img}
              alt=""
              className="rounded-xl w-[100%]"
            />
          ) : (
            <div className="h-[300px] flex justify-center items-center bg-[#f9fbff] rounded-xl mx-auto">
              <Spin size="small" />
            </div>
          )}
          {courseDetails?.status && (
            <div className="py-4 px-5">
              <div className="flex items-center">
                {(courseDetails?.status === 'Registration Going on' ||
                  courseDetails?.status === 'Running') && (
                  <div>
                    {courseDetails?.discounted_price == '0' ||
                    !courseDetails?.discounted_price ? (
                      <span className="text-[#1d2939] font-bold text-3xl">
                        {courseDetails?.price}
                        /-
                      </span>
                    ) : (
                      <>
                        <span className="text-[orangered] font-bold text-lg">
                          <strike>{courseDetails?.price}/-</strike>
                        </span>{' '}
                        &nbsp;
                        <span className="text-[#1d2939] font-bold text-3xl">
                          {courseDetails?.discounted_price}
                          /-
                        </span>
                      </>
                    )}
                  </div>
                )}
                <div className="flex items-center ml-auto border-b-1 cursor-pointer">
                  <BiShareAlt />
                  <span>Share</span>
                </div>
              </div>
              <div>
                {!currentCourse ? (
                  <button
                    className="bg-primary-bg text-[#f9fbff] w-full py-[12px] px-[24px] 
                rounded-[8px] mt-6 hover:opacity-[0.8] transition-all"
                    onClick={handleJoinNow}
                  >
                    Join Live Batch
                  </button>
                ) : !currentCourse?.enrolled_students.includes(
                    findCurrentUser?.student_id,
                  ) ? (
                  <Link
                    href={`/purchase/checkout?courseId=${currentCourse?.id}`}
                  >
                    <button
                      className="bg-primary-bg text-[#f9fbff] w-full py-[12px] px-[24px] 
                    rounded-[8px] mt-6 hover:opacity-[0.8] transition-all"
                    >
                      Join Live Batch
                    </button>
                  </Link>
                ) : (
                  <button
                    className="bg-primary-bg text-[#f9fbff] w-full py-[12px] px-[24px] 
                rounded-[8px] mt-6 hover:opacity-[0.8] transition-all"
                    onClick={handleJoinNow}
                  >
                    Join Live Batch
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerCourseDetails;
