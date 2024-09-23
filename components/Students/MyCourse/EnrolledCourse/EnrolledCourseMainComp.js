import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../../src/context/ContextProvider';
import { useStudentContext } from '../../../../src/context/StudentContext';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import { loadData } from '../../../../src/hooks/loadData';
import AssignmentHome from '../Assignment/AssignmentHome';
import RecordingContent from '../Recording/RecordingContent';
import ResourceContent from '../Resource/ResourceContent';
import HeadingEnrolled from './HeadingEnrolled';
import ModuleEnrolled from './ModuleEnrolled';

const EnrolledCourseMainComp = () => {
  const [innerWidth, setInnerWidth] = useState();
  const { activeMenu, enrolledCourse, setEnrolledCourse } =
    useStateContextDashboard();
  const { findCurrentUser, enrolledCourseIds } = useStateContext();
  const { myCourseShowComp } = useStudentContext();
  const [courseDetails, setCourseDetails] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [courseDataBatch, setCourseDataBatch] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slug = window.location.href.split('/').slice(-1)[0];
      const item = courseDataBatch.find(
        (item) => item.unique_batch_id === slug,
      );
      // setCourseDetails(item);
      setEnrolledCourse(item);
    }
  }, [courseDataBatch, setEnrolledCourse]);

  useEffect(() => {
    loadData('course_data_batch', setCourseDataBatch, {
      orderBy: 'batchNumber',
      orderDirection: 'asc',
      filterFunction: (course) =>
        enrolledCourseIds.includes(course.unique_batch_id) &&
        course.enrolled_students.includes(findCurrentUser.student_id),
    });
  }, [enrolledCourseIds, findCurrentUser]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setInnerWidth(window.innerWidth);
  //     const handleResize = () => setInnerWidth(window.innerWidth);
  //     window.addEventListener('resize', handleResize);

  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }
  //   loadData('course_data_batch', setCourseDataBatch);
  // }, []);

  const openModal = (item) => {
    setModalData(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // console.log(enrolledCourse);

  return (
    <div
      className={`${
        activeMenu ? '' : 'w-full'
      } mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-5 mt-10 sm:mt-0`}
    >
      <div className={`w-full lg:w-[100%] pr-3 sm:pr-6 pl-[84px] lg:pl-[56px]`}>
        <HeadingEnrolled item={enrolledCourse} />
        {myCourseShowComp === 'Modules' ? (
          <ModuleEnrolled />
        ) : myCourseShowComp === 'Assignment' ? (
          <AssignmentHome />
        ) : myCourseShowComp === 'Recording' ? (
          <RecordingContent />
        ) : myCourseShowComp === 'Resource' ? (
          <ResourceContent />
        ) : myCourseShowComp === 'Certificate' ? (
          <div className="flex min-h-40 mb-10 justify-center items-center">
            <h2>Certificate Comp</h2>
          </div>
        ) : (
          ''
        )}
      </div>
      {/* <div className="w-full lg:w-[25%] min-w-[350px]">
        <ProgressHome />
      </div> */}
    </div>
  );
};

export default EnrolledCourseMainComp;
