import React from 'react';
import { DashboardFormat } from '../../../components';
import FromDetails from '../../../components/Admin/Form/FormDetails';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const formId = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<FromDetails />} />
    </div>
  );
};

export default ProtectedRoute(formId, 'admin');
