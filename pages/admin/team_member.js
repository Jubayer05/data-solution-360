import React from 'react';
import { DashboardFormat } from '../../components';
import TeamMember from '../../components/Admin/Team_Instructors/TeamMember';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const subscribedUser = () => {
  return (
    <div>
      <DashboardFormat component={<TeamMember />} />
    </div>
  );
};

export default ProtectedRoute(subscribedUser, 'admin');
