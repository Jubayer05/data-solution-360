import React from 'react';
import { DashboardFormat, SubscribedUser } from '../../components';

const subscribedUser = () => {
  return (
    <div>
      <DashboardFormat component={<SubscribedUser />} />
    </div>
  );
};

export default subscribedUser;
