/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { FiClock } from 'react-icons/fi';
import { LuCalendarDays } from 'react-icons/lu';
import { MdOutlineVideoCall, MdOutlineVideoCameraFront } from 'react-icons/md';
import { colors } from '../../../../src/data/data';

const ModuleIntro = () => {
  const listItem = [
    {
      title: 'Module Introduction',
      time: <FiClock size={16} />,
      date: <LuCalendarDays size={16} />,
    },
  ];
  return (
    <div className="mt-10  w-full">
      {listItem.map((item, index) => (
        <div
          key={item.id}
          className="flex justify-between items-center self-stretch rounded-lg border bg-white p-4 gap-4 my-4"
        >
          <div className="w-[70%] flex items-start gap-3">
            <div
              style={{ backgroundColor: colors[index] }}
              className={`p-2 rounded-lg text-white text-center text-base font-normal`}
            >
              <p className="m-0 text-sm">Module</p>
              <p className="m-0 font-bold">5</p>
            </div>
            <div>
              <h2
                className="text-[22px] font-semibold -mt-[6px]
              "
              >
                {item.title}
              </h2>
              <div className="flex gap-6 items-center mt-1">
                <p className="flex gap-1 items-center">
                  <MdOutlineVideoCall className="text-xl" /> 2 Live Class
                </p>
                <p className="flex gap-1 items-center">
                  <MdOutlineVideoCameraFront className="text-xl" /> 5 Support
                  Class
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="flex justify-between items-center gap-2 bg-[#e2e2e2] hover:bg-[#d5d5d5] font-semibold py-2
        px-5 rounded border-dashboard_border border mt-4 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <img src="/icon/resource.png" className="w-6" alt="" />
                    Resource(3)
                  </span>
                </button>
                <button
                  className="flex justify-between items-center gap-2 bg-[#e2e2e2] hover:bg-[#d5d5d5] font-semibold py-2
        px-5 rounded border-dashboard_border border mt-4 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <img src="/icon/video-player.png" className="w-6" alt="" />
                    Pre Recorded Video(40)
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-[30%] flex justify-end">
            <p className="text-base bg-gray-200 px-2 py-[2px] rounded-md">
              30 June - 5 July, 2024
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleIntro;
