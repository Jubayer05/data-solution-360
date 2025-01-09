import React from 'react';
import { DashboardFormat } from '../../components';
import RecordingHome from '../../components/Students/MyCourse/Recording/RecordingHome';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const recording = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<RecordingHome />} />
    </div>
  );
};

export default ProtectedRoute(recording, ['student']);
