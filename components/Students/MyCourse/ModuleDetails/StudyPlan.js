/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import { LuCalendarDays } from 'react-icons/lu';
import { RiLiveLine } from 'react-icons/ri';

const StudyPlan = () => {
  const todayDate = '5';

  const listItem = [
    {
      title: 'Module Introduction',
      time: <FiClock size={16} />,
      date: <LuCalendarDays size={16} />,
      classDate: '3',
    },
    {
      title:
        'This ia s class topics. This ia s class topics This ia s class topics This ia s class topics',
      time: <FiClock size={16} />,
      date: <LuCalendarDays size={16} />,
      classDate: '5',
    },
  ];
  return (
    <div className="mt-2 mb-10 w-full border border-dashboard_border rounded-lg overflow-hidden shadow-md">
      {listItem.map((item, index) => (
        <div
          key={item.id}
          className={`flex justify-between items-start self-stretch px-4 py-8 gap-4 
          border-b border-x-4 border-x-[transparent] hover:border-x-[gray] 
          transition-all duration-300 ${
            todayDate === item.classDate
              ? 'bg-primary_btn hover:bg-[#00172e]'
              : 'bg-white hover:bg-gray-100'
          }`}
        >
          <div className="w-[70%] flex items-start gap-3">
            <img src="/icon/live.png" className="w-[60px]" alt="" />
            <div>
              <div className="flex gap-3 items-center mb-2">
                <p
                  className={`text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
        text-[13px] px-2 py-1 rounded-md border border-[#3d9970] text-[#3d9970] font-semibold ${
          todayDate === item.classDate ? 'bg-[#ffffff]' : 'bg-[#85ffc82d]'
        }`}
                >
                  Batch-1
                </p>
                <p
                  className={`font-medium text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
        text-[13px]  px-2 py-1 rounded-md border border-dashboard_border  ${
          todayDate === item.classDate ? 'bg-[#ffffff]' : 'bg-[#cfcfcf74]'
        }`}
                >
                  16 May, 9.00 PM
                </p>
              </div>
              <h2
                className={`text-[22px] font-semibold mt-5 leading-6 font-subHeading ${
                  todayDate === item.classDate ? 'text-white' : 'text-black'
                }`}
              >
                {item.title}
              </h2>
            </div>
          </div>
          <div className="w-[30%] flex justify-end">
            {todayDate === item.classDate ? (
              <Link
                //TODO: make it dynamic
                // href={`/join/live/${'batch-2'}`}
                href={`/join/live/${'batch-2'}`}
                className="flex justify-between items-center gap-2 bg-[#fecb63] hover:bg-[#e7b655] 
                font-semibold py-2 px-5 rounded transition-all duration-200 text-black visited:text-black"
              >
                <RiLiveLine />
                <span className="flex items-center gap-2">Join Live</span>
              </Link>
            ) : (
              <button
                className="flex justify-between items-center gap-2 bg-[#e2e2e2] hover:bg-[#d5d5d5] font-semibold py-2
        px-5 rounded border-dashboard_border border transition-all duration-200"
              >
                <FaRegPlayCircle />
                <span className="flex items-center gap-2">Class Recording</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudyPlan;
