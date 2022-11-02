import React from "react";
import { DashboardFormat, StudentCourse } from "../../components";

const myActivity = () => {
  return (
    <div>
      <DashboardFormat component={<StudentCourse />} />
    </div>
  );
};

export default myActivity;
