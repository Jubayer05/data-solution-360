import React from "react";
import { AddCourseComp, DashboardFormat } from "../../components";

const addBlogContent = () => {
  return (
    <div>
      <DashboardFormat component={<AddCourseComp />} />
    </div>
  );
};

export default addBlogContent;
