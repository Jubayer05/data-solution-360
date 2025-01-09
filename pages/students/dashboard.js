import React from 'react';
import { DashboardFormat } from '../../components';
import Profile from '../../components/Students/Profile/Profile';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const dashboard = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<Profile />} />
    </div>
  );
};

// export default dashboard;
export default ProtectedRoute(dashboard, ['student']);
