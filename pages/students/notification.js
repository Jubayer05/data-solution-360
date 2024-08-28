import React from 'react';
import { DashboardFormat } from '../../components';
import NotificationHome from '../../components/Students/Notification/NotificationHome';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const notification = () => {
  return (
    <div>
      <DashboardFormat component={<NotificationHome />} />
    </div>
  );
};

// export default notification;
export default ProtectedRoute(notification, 'student');
