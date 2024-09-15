import React from 'react';
import { DashboardNavbar, Sidebar } from '../..';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';

const DashboardFormatStudent = ({ component, status }) => {
  const { activeMenu } = useStateContextDashboard();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
        <div className="w-64 fixed border-r border-dashboard_border dark:bg-secondary-dark-bg bg-white transition-all duration-[200ms] linear z-50">
          <Sidebar status={status} />
        </div>
      ) : (
        <div className="w-[72px] fixed border-r border-dashboard_border dark:bg-secondary-dark-bg bg-white transition-all duration-[200ms] z-50 linear">
          <Sidebar status={status} />
        </div>
      )}

      <div
        className={`dark:bg-main-bg bg-dashboard_primary_bg main-h-screen w-full ${
          activeMenu ? 'md:ml-64' : 'flex-2'
        }`}
      >
        <div className="fixed bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <DashboardNavbar />
        </div>
        <div className="pt-20 px-0 sm:px-4 md:px-8">{component}</div>
      </div>
    </div>
  );
};

export default DashboardFormatStudent;
