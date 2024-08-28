import React from 'react';
import { DashboardFormat } from '../../../../components';
import ReportHome from '../../../../components/Students/Report/ReportHome';
import ProtectedRoute from '../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const report = () => {
  return (
    <div>
      <DashboardFormat component={<ReportHome />} />
    </div>
  );
};

export default ProtectedRoute(report, 'student');
