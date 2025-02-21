import React from 'react';
import { DashboardFormat } from '../../../components';
import AddForeignStudent from '../../../components/Admin/Students/AddForeignStudent';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const add_foreign_student = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AddForeignStudent />} />
    </div>
  );
};

export default ProtectedRoute(add_foreign_student, [
  'admin',
  'content_manager',
]);
