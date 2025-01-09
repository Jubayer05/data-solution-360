import React from 'react';
import { DashboardFormat } from '../../../components';
import AllBatch from '../../../components/Admin/Batch/AllBatch';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const allBatch = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AllBatch />} />
    </div>
  );
};

export default ProtectedRoute(allBatch, ['admin', 'content_manager']);
