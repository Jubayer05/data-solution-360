import React from 'react';
import { DashboardFormat } from '../../../components';
import AllForms from '../../../components/Admin/Form/AllForms';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const formData = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AllForms />} />
    </div>
  );
};

export default ProtectedRoute(formData, ['admin', 'content_manager']);
