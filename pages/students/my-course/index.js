import React from 'react';
import { DashboardFormat } from '../../../components';
import MyCourseMain from '../../../components/Students/MyCourse/MyCourseMain';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const myCourses = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<MyCourseMain />} />
    </div>
  );
};

export default ProtectedRoute(myCourses, 'student');
