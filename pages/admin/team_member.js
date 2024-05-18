import React from 'react';
import { DashboardFormat } from '../../components';
import TeamMember from '../../components/Admin/Team_Instructors/TeamMember';

const subscribedUser = () => {
  return (
    <div>
      <DashboardFormat component={<TeamMember />} />
    </div>
  );
};

export default subscribedUser;
