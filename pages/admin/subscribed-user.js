import React from 'react';
import { DashboardFormat, SubscribedUser } from '../../components';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const subscribedUser = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<SubscribedUser />} />
    </div>
  );
};

// export default subscribedUser;
export default ProtectedRoute(subscribedUser, 'admin');

