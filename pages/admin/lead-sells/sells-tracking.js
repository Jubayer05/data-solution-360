import React from 'react';
import { DashboardFormat } from '../../../components';
import ShowSells from '../../../components/Admin/LeadSells/ShowSells';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const sellsTracking = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<ShowSells />} />
    </div>
  );
};

export default ProtectedRoute(sellsTracking, ['admin', 'sells_member']);
