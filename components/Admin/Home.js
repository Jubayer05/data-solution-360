import React from "react";
import { useStateContext } from "../../src/context/ContextProvider";

const AdminHome = () => {
  const { userName, photoUrl } = useStateContext();
  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-2xl mt-6">Welcome, {userName} in admin dashboard</h2>
      <img src={photoUrl} alt="" />
      segements: 1. Total Students 2. Total Courses 3. Total blog 4. New
      registered students table 5. Total review 6. total video lessons
    </div>
  );
};

export default AdminHome;
