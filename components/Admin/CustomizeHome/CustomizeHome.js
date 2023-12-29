import React from 'react';
import HeadingDashboard from '../../utilities/HeadingDashboard';
import AddFaq from './AddFaq';
import EditFaq from './EditFaq';
import TrendingCourse from './TrendingCourse';

const CustomizeHome = () => {
  return (
    <div>
      <HeadingDashboard title={`Customize the content of Home Page`} />
      <AddFaq />
      <EditFaq />
      <TrendingCourse />
    </div>
  );
};

export default CustomizeHome;
