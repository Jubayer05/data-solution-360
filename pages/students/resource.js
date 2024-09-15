import React from 'react';
import { DashboardFormat } from '../../components';
import ResourceHome from '../../components/Students/MyCourse/Resource/ResourceHome';
import ProtectedRoute from '../../components/utilities/ProtectedRoute/ProtectedRoute';

const resource = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<ResourceHome />} />
    </div>
  );
};

export default ProtectedRoute(resource, 'student');
