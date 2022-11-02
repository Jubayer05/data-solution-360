import React from "react";
import { DashboardFormat, StudentActivity } from "../../components";

const myActivity = () => {
  return (
    <div>
      <DashboardFormat component={<StudentActivity />} />
    </div>
  );
};

export default myActivity;
