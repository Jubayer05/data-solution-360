/* eslint-disable @next/next/no-img-element */
import { Progress } from 'antd';
import React from 'react';
import { BsExclamationDiamond } from 'react-icons/bs';
import { FaArrowRight } from 'react-icons/fa6';

const Report = () => {
  return (
    <div className="bg-white border border-dashboard_border p-5 rounded">
      <div className="flex justify-between">
        <h5 className="text-base font-bold">Total Progress</h5>
        <button className="flex items-center gap-2 text-sm">
          How calculate result? <BsExclamationDiamond />
        </button>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <img
          src="/icon/fox.png"
          className="w-[70px] rounded-full border-2 border-orange-500 p-1"
          alt=""
        />
        <div>
          <h4 className="text-base font-semibold text-[#ff9d3b]">
            Wow! You are doing great.
          </h4>
          <p className="text-sm">
            Upgrade yourself a little bit. It is possible for you to be the
            best.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 bg-gray-100 px-2 py-2 border border-dashboard_border rounded">
        <p className="rounded font-semibold text-gray-600">Total Score</p>
        <Progress
          percent={60}
          status="active"
          trailColor="#ffffff"
          strokeColor="#12b76a"
          className="flex-1 font-bold text-lg"
        />
      </div>

      <div className="flex gap-3 mt-5">
        <div className="flex-1 bg-white shadow-lg text-center px-1 py-3 border border-dashboard_border rounded">
          <Progress
            strokeColor="#a855f7"
            status="active"
            type="circle"
            percent={75}
            size={70}
            strokeWidth={12}
            className="shadow-lg rounded-full mb-1"
          />
          <p>Quiz</p>
        </div>
        <div className="flex-1 bg-white shadow-lg text-center px-1 py-3 border border-dashboard_border rounded">
          <Progress
            strokeColor="#ff7d4e"
            type="circle"
            percent={75}
            size={70}
            strokeWidth={12}
            className="shadow-lg rounded-full mb-1"
          />
          <p>Assignment</p>
        </div>
        <div className="flex-1 bg-white shadow-lg text-center px-1 py-3 border border-dashboard_border rounded">
          <Progress
            strokeColor="#5d91ff"
            type="circle"
            percent={75}
            size={70}
            strokeWidth={12}
            className="shadow-lg rounded-full mb-1"
          />
          <p>Live Test</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 bg-gray-100 px-2 py-2 border border-dashboard_border rounded">
        <p className="rounded font-semibold text-gray-600">Attendance</p>
        <Progress
          percent={46}
          status="active"
          trailColor="#ffffff"
          strokeColor="#12b76a"
          className="flex-1 font-bold text-lg"
        />
      </div>
      <button
        className="flex justify-center items-center gap-2 bg-secondary_btn hover:bg-[#34825f]
        font-semibold  py-2 px-4 rounded border-green-400 border w-full mt-4 text-white transition-all duration-200"
      >
        Report Details <FaArrowRight />
      </button>

      <button
        className="flex justify-center items-center gap-2 bg-[#c8ffe6] hover:bg-[#acf2d2]
        font-semibold  py-2 px-4 rounded border-green-400 border w-full mt-4 text-[#009351] transition-all duration-200"
      >
        How to calculate score <FaArrowRight />
      </button>
    </div>
  );
};

export default Report;
