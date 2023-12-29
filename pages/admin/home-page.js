import React from 'react';
import { DashboardFormat } from '../../components';
import CustomizeHome from '../../components/Admin/CustomizeHome/CustomizeHome';

const dashboard = () => {
  return (
    <div>
      <DashboardFormat component={<CustomizeHome />} />
    </div>
  );
};

export default dashboard;
