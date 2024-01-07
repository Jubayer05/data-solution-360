import React from 'react';
import { DashboardFormat, ManageCourse } from '../../components';

const manageCourse = () => {
  return (
    <div>
      <DashboardFormat component={<ManageCourse />} />
    </div>
  );
};

export default manageCourse;
