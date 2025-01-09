import React from 'react';
import { DashboardFormat } from '../../../../components';
import EnrolledCourseDetails from '../../../../components/Admin/Batch/EnrolledCourseDetails';
import ProtectedRoute from '../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const enrolledCourseDetails = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<EnrolledCourseDetails />} />
    </div>
  );
};

export default ProtectedRoute(enrolledCourseDetails, [
  'admin',
  'content_manager',
]);
