import React, { useEffect, useState } from 'react';
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
  const { activeMenu, setEnrolledCourse } = useStateContextDashboard();
  const { myCourseShowComp } = useStudentContext();
  const [courseDetails, setCourseDetails] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    loadData('course_data_batch', setCourseData);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slug = window.location.href.split('/').slice(-1)[0];
      const item = courseData.find((item) => item.unique_batch_id === slug);
      setCourseDetails(item);
      setEnrolledCourse(item);
    }
  }, [courseData, setEnrolledCourse]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInnerWidth(window.innerWidth);
      const handleResize = () => setInnerWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    loadData('course_data_batch', setCourseData);
  }, []);

  const openModal = (item) => {
    setModalData(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(courseDetails);

  return (
    <div
      className={`${
        activeMenu ? '' : 'w-full'
      } mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-5 mt-10 sm:mt-0`}
    >
      <div className={`w-full lg:w-[100%] pr-3 sm:pr-6 pl-[84px] lg:pl-[56px]`}>
        <HeadingEnrolled item={courseDetails?.courseData} />
        {myCourseShowComp === 'Modules' ? (
          <ModuleEnrolled courseDetails={courseDetails?.courseData} />
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
