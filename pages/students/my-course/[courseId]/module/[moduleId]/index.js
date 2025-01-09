import React from 'react';
import { DashboardFormat } from '../../../../../../components';
import ModuleDetailsMain from '../../../../../../components/Students/MyCourse/ModuleDetails/ModuleDetailsMain';
import ProtectedRoute from '../../../../../../components/utilities/ProtectedRoute/ProtectedRoute';

const moduleSlug = () => {
  return (
    <div>
      <DashboardFormat status="student" component={<ModuleDetailsMain />} />
    </div>
  );
};

// export default moduleSlug;
export default ProtectedRoute(moduleSlug, ['student']);
