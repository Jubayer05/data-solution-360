import React from 'react';
import { DashboardFormat } from '../../../../components';
import HomeRecordedVideo from '../../../../components/Students/MyCourse/Videos/HomeRecordedVideo';

const videos = () => {
  return (
    <div>
      <DashboardFormat component={<HomeRecordedVideo />} />
    </div>
  );
};

export default videos;
