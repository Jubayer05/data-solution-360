import React from 'react';
import { DashboardFormat } from '../../components';
import ClassJoiningMain from '../../components/Students/ClassJoining/ClassJoiningMain';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const classJoining = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<ClassJoiningMain />} />
    </div>
  );
};

// export default classJoining;
export default ProtectedRoute(classJoining, ['student']);
