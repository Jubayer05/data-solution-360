import React from 'react';
import { DashboardFormat } from '../../../components';
import LeadOnBoarding from '../../../components/Admin/LeadSells/LeadOnBoarding';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const leadOnBoarding = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<LeadOnBoarding />} />
    </div>
  );
};

export default ProtectedRoute(leadOnBoarding, ['admin', 'lead_member']);
