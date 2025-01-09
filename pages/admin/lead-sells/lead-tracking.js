import React from 'react';
import { DashboardFormat } from '../../../components';
import LeadTracking from '../../../components/Admin/LeadSells/LeadTracking';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const leadTracking = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<LeadTracking />} />
    </div>
  );
};

export default ProtectedRoute(leadTracking, ['admin', 'lead_member']);
