import React from 'react';
import { CgMathPlus } from 'react-icons/cg';
import { IoCheckmarkDone } from 'react-icons/io5';
import { useStateContextDashboard } from '../../../src/context/UtilitiesContext';
import { notifications } from '../../../src/data/dummy';
import ButtonDashboard from '../../utilities/dashboard/ButtonDashboard';

const NotificationHome = () => {
  const { activeMenu, enrolledCourse } = useStateContextDashboard();


  return (
    <div>
      <div
        className={`${
          activeMenu
            ? 'w-[80%] mx-auto px-4'
            : 'w-full pr-6 pr-3 md:pr-[6] pl-[84px] md:pl-[96px]'
        } mx-auto flex items-start gap-6`}
      >
        {/* NOTE: LEFT SIDE */}
        <div className="w-full mt-5 mb-10">
          <h2 className="font-heading font-bold text-2xl my-2 ">
            Notification
          </h2>
          <div className="flex justify-between items-center rounded-md bg-white px-3 py-2">
            <p className="font-semibold">Unread(7)</p>
            <ButtonDashboard className="pt-1 pb-1 bg-transparent hover:bg-gray-200 gap-2">
              <IoCheckmarkDone className="text-xl" /> Mark all
            </ButtonDashboard>
          </div>
          <div className="mt-5 rounded-md bg-white px-5">
            {notifications.map((item, index) => (
              <div
                key={item.title}
                className={`pb-2 pt-2  ${
                  index === notifications.length - 1 ? '0' : 'border-b-[1.5px]'
                }`}
              >
                <div className="flex items-start gap-6 w-full py-2">
                  <div className="bg-gray-400 rounded-md mt-1">
                    <CgMathPlus className="text-2xl text-white rotate-45" />
                  </div>
                  <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                      <span className="bg-[#019834] text-white font-medium px-1 py-[1px] rounded text-xs">
                        Live Class
                      </span>
                      <p className="text-base text-[#667085] font-medium cursor-pointer hover:underline">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#667085] font-medium">
                        Mastering Social Media Banner Design: The Next Level
                      </p>
                      <p className="font-semibold text-[#fb4444] text-xs">
                        Jubayer
                      </p>
                    </div>

                    <p className="ml-auto">{item.dateSent}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationHome;
