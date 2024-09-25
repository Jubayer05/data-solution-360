import React from 'react';
import { DashboardFormat } from '../../../../components';
import LeaderBoardHome from '../../../../components/Students/LeaderBoard/LeaderBoardAllHome';
import ProtectedRoute from '../../../../components/utilities/ProtectedRoute/ProtectedRoute';
// import LeaderBoardHome from '../../../../components/Students/LeaderBoard/LeaderAllHome';

const leaderBoard = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<LeaderBoardHome />} />
    </div>
  );
};

export default ProtectedRoute(leaderBoard, 'student');
