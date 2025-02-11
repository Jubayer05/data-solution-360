import React from 'react';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import HeadingDashboard from '../../utilities/dashboard/HeadingDashboard';
import ChangePassword from '../auth/ChangePassword';
import PersonalDetails from './PersonalDetails';

const Profile = ({ title }) => {
  const { activeMenu } = useStateContextDashboard();

  return (
    <div>
      <HeadingDashboard title="Your Profile" showLogout={true} />
      <div
        className={`${
          activeMenu ? 'max-w-6xl mx-auto px-4' : 'w-full px-4'
        } mx-auto mt-10`}
      >
        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-10  mt-10 pb-20">
          <div className="w-full bg-white pb-10 shadow-lg rounded-md">
            <h2 className="text-center bg-secondary_btn text-xl font-bold py-2 uppercase text-white rounded-t-md">
              Personal Details
            </h2>
            <div className="px-8 pt-8">
              <PersonalDetails />
            </div>
          </div>
          <div>
            <div className="w-full bg-white pb-10 shadow-lg rounded-md">
              <h2 className="text-center bg-secondary_btn text-xl font-bold py-2 uppercase text-white rounded-t-md">
                Change Password
              </h2>

              <div className="px-8 pt-8">
                <ChangePassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
