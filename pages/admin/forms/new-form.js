import React from 'react';
import { DashboardFormat } from '../../../components';
import NewForm from '../../../components/Admin/Form/NewForm';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const newForm = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<NewForm />} />
    </div>
  );
};

export default ProtectedRoute(newForm, ['admin', 'content_manager']);
