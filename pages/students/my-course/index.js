import React from 'react';
import { DashboardFormat } from '../../../components';
import MyCourseMain from '../../../components/Students/MyCourse/MyCourseMain';

const myCourses = () => {
  return (
    <div>
      <DashboardFormat component={<MyCourseMain />} />
    </div>
  );
};

export default myCourses;
