import React from 'react';
import { DashboardFormat, RegisterComp } from '../../../components';

const myActivity = () => {
  return (
    <div>
      <DashboardFormat component={<RegisterComp title="Edit your profile" />} />
    </div>
  );
};

export default myActivity;
