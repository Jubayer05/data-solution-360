import React from 'react';
import { DashboardFormat } from '../../components';
import AllStudents from '../../components/Admin/Students/AllStudents';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const all_student = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AllStudents />} />
    </div>
  );
};

export default ProtectedRoute(all_student, 'admin');
