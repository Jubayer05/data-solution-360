import React from 'react';
import { DashboardFormat } from '../../components';
import PreRegisterStaffForm from '../../components/Admin/UserRole/PreRegisterStaffForm';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const user_role = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<PreRegisterStaffForm />} />
    </div>
  );
};

export default ProtectedRoute(user_role, ['admin']);
