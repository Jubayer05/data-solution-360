import React from 'react';
import { DashboardFormat } from '../../../../../components';
import ModuleDetailsMain from '../../../../../components/Students/MyCourse/ModuleDetails/ModuleDetailsMain';

const moduleSlug = () => {
  return (
    <div>
      <DashboardFormat component={<ModuleDetailsMain />} />
    </div>
  );
};

export default moduleSlug;
