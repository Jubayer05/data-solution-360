import React from 'react';
import { AddCourseComp, DashboardFormat } from '../../../components';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const addCourse = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AddCourseComp />} />
    </div>
  );
};

export default ProtectedRoute(addCourse, ['admin', 'content_manager']);
