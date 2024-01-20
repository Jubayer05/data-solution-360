import React from 'react';
import { DashboardFormat, Instructors } from '../../components';

const subscribedUser = () => {
  return (
    <div>
      <DashboardFormat component={<Instructors />} />
    </div>
  );
};

export default subscribedUser;
