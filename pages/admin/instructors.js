import React from 'react';
import { DashboardFormat, Instructors } from '../../components';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const instructor = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<Instructors />} />
    </div>
  );
};

// export default instructor;
export default ProtectedRoute(instructor, ['admin', 'content_manager']);
