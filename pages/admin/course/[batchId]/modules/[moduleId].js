import React from 'react';
// import { DashboardFormat } from '../../../../../components';
import { DashboardFormat } from '../../../../../components';
// import EnrolledCourseDetails from '../../../../../components/Admin/Batch/EnrolledCourseDetails';
import BatchCourseModule from '../../../../../components/Admin/Batch/BatchDetails/BatchCourseModule/BatchCourseModule';
import ProtectedRoute from '../../../../../components/utilities/ProtectedRoute/ProtectedRoute';
// import ProtectedRoute from '../../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const slug = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<BatchCourseModule />} />
    </div>
  );
};

export default ProtectedRoute(slug, ['admin', 'content_manager']);
