import React from 'react';
import { DashboardFormat } from '../../components';
import CustomizeHome from '../../components/Admin/CustomizeHome/CustomizeHome';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const dashboard = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<CustomizeHome />} />
    </div>
  );
};

// export default dashboard;
export default ProtectedRoute(dashboard, ['admin']);
