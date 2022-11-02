/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useStateContext } from "../../src/context/ContextProvider";

const Profile = () => {
  const { findCurrentUser } = useStateContext();

  return (
    <div>
      <h2 className="text-center text-2xl mb-10">Your Profile</h2>
      <div className="w-2/3 mx-auto border-1 p-3">
        <div>
          <div className="flex justify-center ">
            <img
              src={findCurrentUser?.photoUrl}
              alt={findCurrentUser?.firstName}
              className="w-[150px] rounded-full"
            />
          </div>
          <div className="flex ">
            <p className="w-[150px] font-semibold">First Name </p>
            <p>
              : <span className="ml-10"> {findCurrentUser?.firstName}</span>
            </p>
          </div>
          <div className="flex ">
            <p className="w-[150px] font-semibold">Last Name </p>
            <p>
              : <span className="ml-10"> {findCurrentUser?.lastName}</span>
            </p>
          </div>
          <div className="flex ">
            <p className="w-[150px] font-semibold">Full Name </p>
            <p>
              : <span className="ml-10"> {findCurrentUser?.name}</span>
            </p>
          </div>
          <div className="flex ">
            <p className="w-[150px] font-semibold">Email </p>
            <p>
              : <span className="ml-10"> {findCurrentUser?.email}</span>
            </p>
          </div>
          <div className="flex ">
            <p className="w-[150px] font-semibold">Phone Number </p>
            <p>
              : <span className="ml-10"> {findCurrentUser?.phone}</span>
            </p>
          </div>
          <div className="flex ">
            <p className="w-[150px] font-semibold">District </p>
            <p>
              : <span className="ml-10"> {findCurrentUser?.district}</span>
            </p>
          </div>
          <div className="flex ">
            <p className="w-[150px] font-semibold">Address </p>
            <p>
              : <span className="ml-10"> {findCurrentUser?.address}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
