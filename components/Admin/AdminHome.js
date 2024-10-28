import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import { useStateContext } from '../../src/context/ContextProvider';
import { dashboardAdmin } from '../../src/data/data';
import HeadingDashboard from '../utilities/dashboard/HeadingDashboard';

const AdminHome = () => {
  const { userName } = useStateContext();
  return (
    <div>
      <HeadingDashboard
        title={`Welcome to admin dashboard`}
        showLogout={true}
      />
      <div className="flex justify-center items-center flex-col p-2 md:mx-6">
        <h2 className="text-2xl mt-6 capitalize mb-10"></h2>

        <div className="grid grid-cols-3 w-full gap-5 pb-20">
          {dashboardAdmin?.map((item) => (
            <HomeGroup key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

const HomeGroup = ({ item }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, ${item.bgFrom}, ${item.bgTo})`,
      }}
      className={` rounded-lg text-white px-6 py-5 ${
        item.gridClass ? 'row-span-2' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg text-white">{item.title}</h3>
          <h2 className="text-3xl text-white -mt-2">350</h2>
        </div>
        <div className="p-2 bg-gradient-to-t rounded text-2xl from-[#01190c62] to-[#0b191121] ">
          {item.icon}
        </div>
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
