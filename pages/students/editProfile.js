import React from "react";
import { DashboardFormat, ProfileEdit } from "../../components";

const myActivity = () => {
  return (
    <div>
      <DashboardFormat component={<ProfileEdit />} />
    </div>
  );
};

export default myActivity;
