import React from 'react';
import { DashboardFormat } from '../../../components';
import SummaryReports from '../../../components/Admin/LeadSells/AllReport/SummaryReport';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const allReport = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<SummaryReports />} />
    </div>
  );
};

export default ProtectedRoute(allReport, ['admin']);
