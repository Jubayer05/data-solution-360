import React from 'react';
import { DashboardFormat } from '../../../../components';
import NoticeHome from '../../../../components/Students/NoticeBoard/NoticeHome';

const notice = () => {
  return (
    <div>
      <DashboardFormat component={<NoticeHome />} />
    </div>
  );
};

export default notice;
