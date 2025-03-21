import React from 'react';
import JoinLive from '../../../../../../../../components/Services/JoinLive';
import DashboardFormatStudent from '../../../../../../../../components/utilities/dashboard/DashboardFormatStudent';
import ProtectedRoute from '../../../../../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const joinLive = () => {
  return (
    <div>
      <DashboardFormatStudent status="student" component={<JoinLive />} />
    </div>
  );
};

// export default joinLive;
export default ProtectedRoute(joinLive, ['student']);
