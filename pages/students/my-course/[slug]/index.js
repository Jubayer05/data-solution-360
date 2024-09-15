import React from 'react';
import { DashboardFormat } from '../../../../components';
import EnrolledCourseMainComp from '../../../../components/Students/MyCourse/EnrolledCourse/EnrolledCourseMainComp';
import ProtectedRoute from '../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const enrolledCoursePage = () => {
  return (
    <div>
      <DashboardFormat
        status="student"
        component={<EnrolledCourseMainComp />}
      />
    </div>
  );
};

export default ProtectedRoute(enrolledCoursePage, 'student');
