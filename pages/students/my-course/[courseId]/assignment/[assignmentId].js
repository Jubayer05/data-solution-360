import React from 'react';
import { DashboardFormat } from '../../../../../components';
import AssignmentDetailsStudent from '../../../../../components/Students/MyCourse/Assignment/AssignmentDetailsStudent';
import ProtectedRoute from '../../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const assignmentSlug = () => {
  return (
    <div>
      <DashboardFormat
        status="student"
        component={<AssignmentDetailsStudent />}
      />
    </div>
  );
};

export default ProtectedRoute(assignmentSlug, ['student']);
