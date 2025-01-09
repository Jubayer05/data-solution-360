import React from 'react';
import { DashboardFormat } from '../../../components';
import SellsTracking from '../../../components/Admin/LeadSells/SellsTracking';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const sellsTracking = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<SellsTracking />} />
    </div>
  );
};

export default ProtectedRoute(sellsTracking, ['admin', 'sells_member']);
