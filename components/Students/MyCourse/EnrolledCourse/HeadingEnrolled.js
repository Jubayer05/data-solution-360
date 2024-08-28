import { Progress } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsPatchQuestionFill } from 'react-icons/bs';
import { FaChevronRight } from 'react-icons/fa6';
import { useStudentContext } from '../../../../src/context/StudentContext';
import { colors } from '../../../../src/data/data';

const HeadingEnrolled = ({ item }) => {
  const [activeBtn, setActiveBtn] = useState('Modules');
  const { setMyCourseShowComp } = useStudentContext();
  const segmentBtn = [
    {
      id: '1',
      title: 'Modules',
    },
    {
      id: '2',
      title: 'Assignment',
    },
    {
      id: '3',
      title: 'Recording',
    },
    {
      id: '4',
      title: 'Resource',
    },
    {
      id: '5',
      title: 'Certificate',
    },
  ];

  const handleSegmentClick = (item) => {
    setActiveBtn(item.title);
    setMyCourseShowComp(item.title);
  };

  return (
    <div>
      <div className="grid grid-cols-2 py-2 gap-3">
        <div className="w-full flex items-center gap-4 bg-primary_btn px-3 py-3 rounded-md cursor-pointer">
          <div
            style={{ backgroundColor: colors[20] }}
            className={`p-2 rounded-lg text-white text-center text-base font-normal`}
          >
            <p className="m-0 text-sm">Module</p>
            <p className="m-0 font-bold">1</p>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="bg-gray-300 px-2 py-0.5 text-xs rounded">
                6 July - 12 July
              </p>
              <Progress
                percent={30}
                status="active"
                trailColor="#eaeaea"
                strokeColor="#12b76a"
                showInfo={false}
                className="w-[100px]"
              />
              <p className="text-white text-xs">2/7 Days End</p>
            </div>
            <h2 className="text-xl font-bold leading-6 text-white">
              Mastering Module one
            </h2>
          </div>
          <div>
            <FaChevronRight className="text-white" />
          </div>
        </div>
        <div className="w-full flex items-center gap-4 bg-white border px-5 py-4 rounded-md">
          <Image
            width={500}
            height={300}
            src="/icon/question-mark.png"
            className="w-[50px]"
            alt=""
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold leading-6 ">
              Problem Solving Class
            </h2>
            <p className="text-xs mt-1">2/7 Days End</p>
          </div>
          <button
            className="flex justify-center items-center gap-2 bg-hover_btn hover:bg-[#fecb63] font-semibold
          py-2 px-4 rounded border-orange-400 border "
          >
            <BsPatchQuestionFill /> Ask Question
          </button>
        </div>
      </div>
      <Link href={`/students/my-course/${item?.key}/videos`}>
        <div
          className="w-full flex items-center gap-4 bg-[#e9efff] border border-[#7986f7] px-5 py-3 rounded-md 
        mt-3 cursor-pointer hover:shadow-md transition-all duration-200"
        >
          <Image
            width={500}
            height={300}
            src="/icon/video-player.png"
            className="w-[60px]"
            alt=""
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold leading-6 ">
              Recorded Live Class
            </h2>
            <p className="text-xs mt-1">35 Videos</p>
          </div>
          <div>
            <FaChevronRight />
          </div>
        </div>
      </Link>

      <div className="w-full flex items-center gap-2 bg-white border px-5 py-4 rounded-md my-5">
        {segmentBtn.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSegmentClick(item)}
            className={`${
              activeBtn === item.title
                ? 'bg-primary_btn hover:bg-[#001f3fdb] text-white'
                : ''
            } flex justify-center items-center gap-2  hover:bg-[#c2c2c2] font-semibold
          py-2 px-4 rounded border `}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeadingEnrolled;
