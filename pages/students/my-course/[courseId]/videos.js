import React from 'react';
import { DashboardFormat } from '../../../../components';
import HomeRecordedVideo from '../../../../components/Students/MyCourse/Videos/HomeRecordedVideo';
import ProtectedRoute from '../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const videos = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<HomeRecordedVideo />} />
    </div>
  );
};

// export default videos;
export default ProtectedRoute(videos, ['student']);
