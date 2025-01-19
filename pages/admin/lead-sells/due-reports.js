import React from 'react';
import { DashboardFormat } from '../../../components';
import DueReportHome from '../../../components/Admin/LeadSells/AllReport/DueReportHome';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const dueReport = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<DueReportHome />} />
    </div>
  );
};

export default ProtectedRoute(dueReport, ['admin']);
