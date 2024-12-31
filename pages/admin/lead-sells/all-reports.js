import React from 'react';
import { DashboardFormat } from '../../../components';
import AllReport from '../../../components/Admin/LeadSells/AllReport/AllReport';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const allReport = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AllReport />} />
    </div>
  );
};

export default ProtectedRoute(allReport, 'admin');
