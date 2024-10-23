import React from 'react';
import { DashboardFormat } from '../../../../components';
import EditCourseItem from '../../../../components/Admin/ManageCourse/EditCourseItem';
import ProtectedRoute from '../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const courseId = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<EditCourseItem />} />
    </div>
  );
};

// export default manageCourse;
export default ProtectedRoute(courseId, 'admin');
