import React from 'react';
import { DashboardFormat } from '../../../../components';
import ReportHome from '../../../../components/Students/Report/ReportHome';

const report = () => {
  return (
    <div>
      <DashboardFormat component={<ReportHome />} />
    </div>
  );
};

export default report;
