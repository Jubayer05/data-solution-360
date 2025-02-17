import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Breadcrumb, Spin } from 'antd';
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Clock,
  Rocket,
  Share2,
  Users,
  Video,
} from 'lucide-react';
import Image from 'next/image';
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

  console.log(courseDataBatch);

  const currentCourse = useMemo(() => {
    return courseDataBatch.find(
      (course) => course.unique_batch_id === courseDetails?.unique_batch_id,
    );
  }, [courseDataBatch, courseDetails]);

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

  const stats = [
    {
      icon: (
        <Rocket className="w-8 h-8 text-blue-600 group-hover:text-blue-500 transition-all duration-300 ease-in-out" />
      ),
      value: courseDetails?.module_number || 0,
      label: 'Modules',
      suffix: '',
      accent: 'border-blue-200',
    },
    {
      icon: (
        <Video className="w-8 h-8 text-purple-600 group-hover:text-purple-500 transition-all duration-300 ease-in-out" />
      ),
      value: courseDetails?.live_class_number || 0,
      label: 'Live Class',
      suffix: '+',
      accent: 'border-purple-200',
    },
    {
      icon: (
        <Briefcase className="w-8 h-8 text-emerald-600 group-hover:text-emerald-500 transition-all duration-300 ease-in-out" />
      ),
      value: courseDetails?.project_number || 0,
      label: 'Real World Project',
      suffix: '',
      accent: 'border-emerald-200',
    },
    {
      icon: (
        <Award className="w-8 h-8 text-rose-600 group-hover:text-rose-500 transition-all duration-300 ease-in-out" />
      ),
      value: 'Community',
      label: 'Large DS-360 Community',
      suffix: '',
      accent: 'border-rose-200',
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative rounded-xl p-6 bg-white border ${stat.accent} hover:shadow-lg transition-all duration-300 ease-in-out`}
            >
              {/* Main Content Container */}
              <div className="relative flex flex-col items-center">
                {/* Icon Container */}
                <div className="mb-4 relative">
                  <div className="absolute inset-0 bg-gray-50 rounded-full scale-150 group-hover:scale-175 transition-transform duration-300 ease-in-out" />
                  <div className="relative">{stat.icon}</div>
                </div>

                {/* Value */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 tracking-tight">
                  {stat.value}
                  <span className="font-medium">{stat.suffix}</span>
                </h2>

                {/* Label */}
                <p className="text-sm text-gray-600 font-medium text-center leading-snug">
                  {stat.label}
                </p>
              </div>

              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-xl opacity-20 border-current" />
              </div>
            </div>
          ))}
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
                  <Calendar />
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
                <div className="flex items-center ml-auto border-b-1 cursor-pointer">
                  <Share2 />
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
