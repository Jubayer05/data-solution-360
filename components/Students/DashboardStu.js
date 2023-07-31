import React from 'react';
import { AiOutlineClockCircle, AiOutlineFileText } from 'react-icons/ai';
import { BiBarChart } from 'react-icons/bi';
import { TbCurrencyTaka } from 'react-icons/tb';

import { Avatar } from 'antd';
import Link from 'next/link';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { useStateContext } from '../../src/context/ContextProvider';

const AdminHome = () => {
  const { userName, language, courseData } = useStateContext();
  return (
    <div className="flex justify-center items-center flex-col p-2 md:mx-6">
      <div>
        <h2 className="text-2xl text-center mt-6 capitalize mb-10 text-cyan-700">
          Welcome, {userName} in your student dashboard
        </h2>

        <h2 className="text-xl">Your Courses</h2>
        <p>You do not select any course</p>

        <h2 className="text-xl mt-12">Suggested Course</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-5 pt-0">
          {courseData.map((item) => (
            <CrashCourseItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;

const CrashCourseItem = ({ item }) => {
  return (
    <div className=" sm:w-full mx-auto rounded-lg overflow-hidden sm:mx-2 hover:-translate-y-3 hover:shadow-xl transition-translate duration-300 cursor-pointer mt-4">
      <Link href={`/course-details/${item.key}`}>
        <img src={item.img} alt="" className="w-full h-48" />
        <div className="px-4 py-3 border-1 rounded-lg rounded-t-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-[orange] font-heading mr-2">4.7</span>
              <div className="flex text-[orange] ">
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
                <BsStarFill className="mx-[1px]" />
                <BsStarHalf className="mx-[1px]" />
                <BsStar className="mx-[1px]" />
              </div>
              <div className="font-bold ml-1 text-gray-500">(3)</div>
            </div>
            <div className="flex items-center text-[#4F547B]">
              <BiBarChart className="mr-0.5" />
              <span>{item.difficulty}</span>
            </div>
          </div>
          <p className="inline-block text-lg font-semibold mb-1.5 mt-2 text-[#140342] hover:text-[#6440FB]">
            {item.title}
          </p>
          <div className="flex items-center font-medium text-[14px] flex-wrap text-[#4F547B]">
            <div className="flex items-center">
              <AiOutlineFileText className="mr-1" />
              <span className="">{item.lesson} Lessons</span>
            </div>
            <div className="flex items-center mx-2">
              <AiOutlineClockCircle className="mr-1" />
              <span>{item.duration} Days</span>
            </div>
          </div>

          <div className="h-[1px] w-full bg-slate-200 mt-4 mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar />
              <span className="ml-2">{item.author}</span>
            </div>
            <div>
              <span className="flex items-center font-bold text-lg text-[#42476f]">
                <TbCurrencyTaka />
                {item.price}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
