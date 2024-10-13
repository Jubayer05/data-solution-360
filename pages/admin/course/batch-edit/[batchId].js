import React from 'react';
import { DashboardFormat } from '../../../../components';
import EditBatch from '../../../../components/Admin/Batch/EditBatch';
import ProtectedRoute from '../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const editBatch = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<EditBatch />} />
    </div>
  );
};

export default ProtectedRoute(editBatch, 'admin');
