import React from 'react';
import { DashboardFormat } from '../../../../components';
import NoticeHome from '../../../../components/Students/NoticeBoard/NoticeHome';
import ProtectedRoute from '../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const notice = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<NoticeHome />} />
    </div>
  );
};

// export default notice;
export default ProtectedRoute(notice, ['student']);
