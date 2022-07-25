import React from "react";
import { DashboardFormat } from "../../components";
import AdminHome from "../../components/Admin/Home";

const dashboard = () => {
  return (
    <div>
      <DashboardFormat component={<AdminHome />} />
    </div>
  );
};

export default dashboard;
