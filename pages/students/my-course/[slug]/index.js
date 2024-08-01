import React from 'react';
import { DashboardFormat } from '../../../../components';
import EnrolledCourseMainComp from '../../../../components/Students/MyCourse/EnrolledCourse/EnrolledCourseMainComp';

const enrolledCoursePage = () => {
  return (
    <div>
      <DashboardFormat component={<EnrolledCourseMainComp />} />
    </div>
  );
};

export default enrolledCoursePage;
