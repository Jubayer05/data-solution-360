import React from 'react';
import { DashboardFormat } from '../../../components';
import AddCoupon from '../../../components/Admin/Coupon/AddCoupon';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const newForm = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AddCoupon />} />
    </div>
  );
};

export default ProtectedRoute(newForm, ['admin', 'content_manager']);
