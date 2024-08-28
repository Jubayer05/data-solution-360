import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../../src/context/ContextProvider';
import { useStudentContext } from '../../../../src/context/StudentContext';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import ProgressHome from '../../Progress/ProgressHome';
import AssignmentHome from '../Assignment/AssignmentHome';
import RecordingContent from '../Recording/RecordingContent';
import ResourceContent from '../Resource/ResourceContent';
import HeadingEnrolled from './HeadingEnrolled';
import ModuleEnrolled from './ModuleEnrolled';

const EnrolledCourseMainComp = () => {
  const [innerWidth, setInnerWidth] = useState();
  const { courseData } = useStateContext();
  const { activeMenu, setEnrolledCourse } = useStateContextDashboard();
  const { myCourseShowComp } = useStudentContext();
  const [courseDetails, setCourseDetails] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slug = window.location.href.split('/').slice(-1)[0];
      const item = courseData.find((item) => item.key === slug);
      setCourseDetails(item);
      setEnrolledCourse(item);
    }
  }, [courseData, setEnrolledCourse]);

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
  };

  return (
    <div
      className={`${
        activeMenu ? '' : 'w-full pr-6 pl-[56px]'
      } mx-auto flex items-center gap-5`}
    >
      <div className="w-[75%]">
        <HeadingEnrolled item={courseDetails} />
        {myCourseShowComp === 'Modules' ? (
          <ModuleEnrolled courseDetails={courseDetails} />
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
      <div className="w-[25%] min-w-[350px]">
        <ProgressHome />
      </div>
    </div>
  );
};

export default EnrolledCourseMainComp;
