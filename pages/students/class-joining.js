import React from 'react';
import { DashboardFormat } from '../../components';
import ClassJoiningMain from '../../components/Students/ClassJoining/ClassJoiningMain';

const classJoining = () => {
  return (
    <div>
      <DashboardFormat component={<ClassJoiningMain />} />
    </div>
  );
};

export default classJoining;
