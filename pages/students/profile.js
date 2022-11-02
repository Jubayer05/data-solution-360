import React from "react";
import { DashboardFormat, ProfileStudent } from "../../components";

const dashboard = () => {
  return (
    <div>
      <DashboardFormat component={<ProfileStudent />} />
    </div>
  );
};

export default dashboard;
