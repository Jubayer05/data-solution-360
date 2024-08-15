import React from 'react';
import { DashboardFormat } from '../../components';
import ResourceHome from '../../components/Students/MyCourse/Resource/ResourceHome';

const resource = () => {
  return (
    <div>
      <DashboardFormat component={<ResourceHome />} />
    </div>
  );
};

export default resource;
