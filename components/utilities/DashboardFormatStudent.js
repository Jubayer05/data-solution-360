import React from "react";
import { Sidebar, DashboardNavbar } from "..";
import { useStateContextDashboard } from "../../src/context/UtilitiesContext";
import { linksStudent } from "../../src/data/dummy";

const DashboardFormatStudent = ({ component }) => {
  const { activeMenu } = useStateContextDashboard();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar links={linksStudent} />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg bg-white">
          <Sidebar links={linksStudent} />
        </div>
      )}

      <div
        className={`dark:bg-main-bg bg-main-bg main-h-screen w-full ${
          activeMenu ? "md:ml-72" : "flex-2"
        }`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <DashboardNavbar />
        </div>
        <div>{component}</div>
      </div>
    </div>
  );
};

export default DashboardFormatStudent;
