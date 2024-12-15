import React from 'react';
import { DashboardFormat } from '../../../components';
import AllCoupons from '../../../components/Admin/Coupon/AllCoupon';
import ProtectedRoute from '../../../components/utilities/ProtectedRoute/ProtectedRoute';

const formData = () => {
  return (
    <div>
      <DashboardFormat status="admin" component={<AllCoupons />} />
    </div>
  );
};

export default ProtectedRoute(formData, 'admin');
