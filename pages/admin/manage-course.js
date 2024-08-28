import React from 'react';
import { DashboardFormat, ManageCourse } from '../../components';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const manageCourse = () => {
  return (
    <div>
      <DashboardFormat component={<ManageCourse />} />
    </div>
  );
};

// export default manageCourse;
export default ProtectedRoute(manageCourse, 'admin');

