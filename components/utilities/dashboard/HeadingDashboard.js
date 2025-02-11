import React from 'react';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';

import { LogOut } from 'lucide-react';
import { handleLogout } from '../../../firebase';

const HeadingDashboard = ({ title, batchNo, showLogout }) => {
  const { activeMenu } = useStateContextDashboard();

  return (
    <div
      className={`${
        activeMenu ? 'max-w-6xl mx-auto px-4' : 'w-full px-3'
      } flex items-center justify-between mt-3`}
    >
      <div className="w-full">
        <h2 className="text-3xl pt-6 pb-4 text-[#231f40] md:text-center font-medium font-dash_heading ">
          <span className="font-bold">{title}</span>
        </h2>
        {batchNo && (
          <span>
            Batch Number: <strong className="text-primary">{batchNo}</strong>
          </span>
        )}
      </div>
      {showLogout && (
        <button
          type="button"
          onClick={handleLogout}
          className="text-[#101828] bg-[#EAECF0] hover:bg-[#D0D5DD] rounded-md px-6 py-3 flex justify-center 
      items-center gap-1 text-base font-semibold"
        >
          Logout
          <LogOut className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default HeadingDashboard;
