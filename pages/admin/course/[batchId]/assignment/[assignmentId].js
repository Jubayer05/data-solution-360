import React from 'react';
import { DashboardFormat } from '../../../../../components';
import AssignmentDetails from '../../../../../components/Admin/Batch/BatchDetails/Assignment/AssignmentDetails';
import ProtectedRoute from '../../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const slug = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AssignmentDetails />} />
    </div>
  );
};

export default ProtectedRoute(slug, 'admin');
