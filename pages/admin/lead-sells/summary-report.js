import React from 'react';
import { DashboardFormat } from '../../../components';
import CreateNewBatch from '../../../components/Admin/Batch/CreateNewBatch';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const summaryReport = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<CreateNewBatch />} />
    </div>
  );
};

export default ProtectedRoute(summaryReport, 'admin');
