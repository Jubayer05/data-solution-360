import React from 'react';
import { DashboardFormat } from '../../components';
import AdminHome from '../../components/Admin/AdminHome';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const dashboard = () => {
  return (
    <div>
      <DashboardFormat component={<AdminHome />} />
    </div>
  );
};

// export default dashboard;
export default ProtectedRoute(dashboard, 'admin');
