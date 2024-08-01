import React from 'react';
import { DashboardFormat, DashboardStudent } from '../../components';

const dashboard = () => {
  return (
    <div>
      <DashboardFormat component={<DashboardStudent />} />
    </div>
  );
};

export default dashboard;
