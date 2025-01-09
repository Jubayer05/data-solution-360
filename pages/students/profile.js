import React from 'react';
import { DashboardFormat, ProfileStudent } from '../../components';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const profile = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<ProfileStudent />} />
    </div>
  );
};

// export default profile;
export default ProtectedRoute(profile, ['student']);
