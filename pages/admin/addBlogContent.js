import React from "react";
import { AddNewBlog, DashboardFormat } from "../../components";

const addBlogContent = () => {
  return (
    <div>
      <DashboardFormat component={<AddNewBlog />} />
    </div>
  );
};

export default addBlogContent;
