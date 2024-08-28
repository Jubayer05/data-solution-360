import React from 'react';
import { DashboardFormat, DashboardStudent } from '../../components';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const dashboard = () => {
  return (
    <div>
      <DashboardFormat component={<DashboardStudent />} />
    </div>
  );
};

export default ProtectedRoute(dashboard, 'student');
