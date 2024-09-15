import React from 'react';
import { DashboardFormat } from '../../../components';
import CreateNewBatch from '../../../components/Admin/Batch/CreateNewBatch';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const createNewCourse = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<CreateNewBatch />} />
    </div>
  );
};

export default ProtectedRoute(createNewCourse, 'admin');
