import React from 'react';
import { DashboardFormat } from '../../../../components';
import LeaderBoardHome from '../../../../components/Students/LeaderBoard/LeaderBoardAllHome';
// import LeaderBoardHome from '../../../../components/Students/LeaderBoard/LeaderAllHome';

const leaderBoard = () => {
  return (
    <div>
      <DashboardFormat component={<LeaderBoardHome />} />
    </div>
  );
};

export default leaderBoard;
