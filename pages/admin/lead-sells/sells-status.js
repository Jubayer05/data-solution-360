import React from 'react';
import { DashboardFormat } from '../../../components';
import SellsStatusReport from '../../../components/Admin/LeadSells/AllReport/SellsStatusReport';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const sellsStatus = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<SellsStatusReport />} />
    </div>
  );
};

export default ProtectedRoute(sellsStatus, ['admin', 'sells_member']);
