import React from "react";
import { CgProfile } from "react-icons/cg";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useStateContext } from "../../src/context/ContextProvider";

const AdminHome = () => {
  const { userName, photoUrl } = useStateContext();
  return (
    <div className="flex justify-center items-center flex-col p-2 md:mx-6">
      <h2 className="text-2xl mt-6">Welcome, {userName} in admin dashboard</h2>
      <img src={photoUrl} alt="" />
      <div>
        <li>1. Total Students</li>
        <li>2. Total Courses</li>
        <li>3. Total blog</li>
        <li>4. New registered students table</li>
        <li>5. Total review</li>
        <li>6. total video lessons</li>
      </div>

      <div className="grid grid-cols-3 w-full gap-5 pb-20">
        <HomeGroup />
        <HomeGroup />
        <HomeGroup classes="row-span-2" />
        <HomeGroup />
        <HomeGroup />
      </div>
    </div>
  );
};

export default AdminHome;

const HomeGroup = ({ classes }) => {
  return (
    <div
      className={`${classes} bg-gradient-to-r rounded-lg from-[#1a9f53] to-[#4eda89] text-white px-6 py-5`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg text-white">Total Students</h3>
          <h2 className="text-3xl text-white -mt-2">350</h2>
        </div>
        <CgProfile />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="px-[6px] py-[5px] text-xs bg-[#00000058] mr-2 rounded-md">
            +95%
          </span>
          <span>Last Month</span>
        </div>
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};
