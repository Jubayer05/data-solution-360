/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useStateContext } from "../../src/context/ContextProvider";

const MyActivity = () => {
  const { findCurrentUser } = useStateContext();

  console.log(findCurrentUser);

  return (
    <div>
      <h2 className="text-center text-2xl mb-10">My Activity</h2>
      <h3 className="text-center mt-32 text-xl pb-24 text-[orangered]">
        Coming Soon
      </h3>
    </div>
  ); 
};

export default MyActivity;
