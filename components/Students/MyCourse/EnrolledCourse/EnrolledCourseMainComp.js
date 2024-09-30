import React from 'react';
import { useStudentContext } from '../../../../src/context/StudentContext';
import { useStateContextDashboard } from '../../../../src/context/UtilitiesContext';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import ProgressHome from '../../Progress/ProgressHome';
import AssignmentHome from '../Assignment/AssignmentHome';
import RecordingContent from '../Recording/RecordingContent';
import ResourceContent from '../Resource/ResourceContent';
import HeadingEnrolled from './HeadingEnrolled';
import ModuleEnrolled from './ModuleEnrolled';

const EnrolledCourseMainComp = () => {
  const { activeMenu } = useStateContextDashboard();
  const { myCourseShowComp } = useStudentContext();
  const { enrolledCourse } = useEnrolledCourseData();

  return (
    <div
      className={`${
        activeMenu ? 'w-full' : 'w-full'
      } mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-5 my-10 sm:mt-0`}
    >
      <div
        className={`w-full lg:w-[100%] pr-3 sm:pr-6  ${
          activeMenu ? '' : 'pl-[84px] lg:pl-[56px]'
        }`}
      >
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
      <div className="w-full lg:w-[25%] min-w-[350px]">
        <ProgressHome />
      </div>
    </div>
  );
};

export default EnrolledCourseMainComp;
