import React from "react";
import { DashboardFormat, ProfileStudent } from "../../components";

const profile = () => {
  return (
    <div>
      <DashboardFormat component={<ProfileStudent />} />
    </div>
  );
};

export default profile;
