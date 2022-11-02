import React from "react";
import { DashboardFormat } from "../../components";
import Register from "../../components/GeneralComp/Register";

const myActivity = () => {
  return (
    <div>
      <DashboardFormat component={<Register title="Edit your profile" />} />
    </div>
  );
};

export default myActivity;
