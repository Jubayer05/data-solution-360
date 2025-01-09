import React from 'react';
import { DashboardFormat } from '../../../components';
import EditCourseData from '../../../components/Admin/ManageCourse/EditCourseData';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const manageCourse = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<EditCourseData />} />
    </div>
  );
};

// export default manageCourse;
export default ProtectedRoute(manageCourse, ['admin', 'content_manager']);
