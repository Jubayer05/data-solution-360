/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FaAward } from 'react-icons/fa';
import { GiStarFormation } from 'react-icons/gi';
import { HiUserGroup } from 'react-icons/hi2';
import { MdLocationOn } from 'react-icons/md';
import { useStateContext } from '../../src/context/ContextProvider';
import HeadingDashboard from '../utilities/HeadingDashboard';

const Profile = ({ title }) => {
  const { findCurrentUser, userName } = useStateContext();

  console.log(findCurrentUser);

  return (
    <div>
      <HeadingDashboard username={title ? userName : ''} title="Your Profile" />
      <div className="w-full max-w-6xl mx-auto mt-10">
        <div className="bg-white grid grid-cols-2 lg:grid-cols-4 py-8 px-4 rounded-md shadow-md mb-4">
          <div>
            <img
              src={findCurrentUser?.photoUrl || '/icon/profile.png'}
              className="w-24 sm:w-40 mx-auto"
              alt=""
            />
            {/* <div></div> */}
          </div>
          <div>
            <h2 className="uppercase font-bold text-lg sm:text-2xl text-[#1aa5d3]">
              {findCurrentUser?.fullName}
            </h2>
            <p className="text-base sm:text-lg">{findCurrentUser?.jobTitle}</p>
            <div className="flex items-center my-2">
              <FaAward className="text-base sm:text-lg text-[#1aa5d3]" />
              <span className="ml-4 text-sm md:text-base">0 Badges</span>
            </div>
            <div className="flex items-center my-2">
              <HiUserGroup className="text-base sm:text-lg text-[#1aa5d3]" />
              <span className="ml-4 text-sm md:text-base">0 Enrollment</span>
            </div>
            <div className="flex items-center my-2">
              <GiStarFormation className="text-base sm:text-lg text-[#1aa5d3]" />
              <span className="ml-4 text-sm md:text-base">0 Reviews</span>
            </div>
            <div className="flex items-center my-2">
              <MdLocationOn className="text-base sm:text-lg text-[#1aa5d3]" />
              <span className="ml-4 text-sm md:text-base">
                {findCurrentUser?.district}, Bangladesh
              </span>
            </div>
          </div>
          <div className="col-span-2">
            <h2 className="uppercase font-bold text-lg sm:text-2xl ">
              Your Bio
            </h2>
            <p className="text-sm sm:text-base font-light leading-6 text-[#8b8b8b]">
              {findCurrentUser?.biography}
            </p>
          </div>
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 px-6 gap-10  mt-20 pb-10">
          <div className="w-full bg-white pb-10 shadow-lg rounded-md">
            <h2 className="text-center bg-[#1aa5d3] text-xl font-bold py-2 uppercase text-white rounded-t-md">
              Education and Skills
            </h2>
            <div className="px-4 pt-4">
              <h2 className="font-bold text-xl uppercase">Education</h2>
              <p className="text-[#999] text-sm">
                {findCurrentUser?.educationLevel}
              </p>
              <p className="text-[#999] -mt-2">
                {findCurrentUser?.universityName
                  ? findCurrentUser?.universityName
                  : 'You did not update your educational information'}
              </p>
            </div>
            <div className="px-4 pt-4">
              <h2 className="font-bold text-xl uppercase">Skill</h2>
              <p className="text-[#999]">
                {findCurrentUser?.skillSet
                  ? findCurrentUser?.skillSet
                  : 'You did not update your skills information'}
              </p>
            </div>
            <div className="px-4 pt-4">
              <h2 className="font-bold text-xl uppercase">Language</h2>
              <p className="text-[#999]">
                {findCurrentUser?.language
                  ? findCurrentUser?.language
                  : 'You did not update your language information'}
              </p>
            </div>
          </div>
          <div>
            <div className="w-full bg-white pb-10 shadow-lg rounded-md">
              <h2 className="text-center bg-[#1aa5d3] text-xl font-bold py-2 uppercase text-white rounded-t-md">
                Contact Information
              </h2>
              <div className="px-4 pt-4">
                <h2 className="font-bold text-xl uppercase">Email</h2>
                <p className="text-[#999]">{findCurrentUser?.email}</p>
              </div>
              <div className="px-4 pt-4">
                <h2 className="font-bold text-xl uppercase">Phone Number</h2>
                <p className="text-[#999]">{findCurrentUser?.phone}</p>
              </div>

              <div className="px-4 pt-4">
                <h2 className="font-bold text-xl uppercase">Location</h2>
                <p className="text-[#999]">
                  {findCurrentUser?.district}, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
