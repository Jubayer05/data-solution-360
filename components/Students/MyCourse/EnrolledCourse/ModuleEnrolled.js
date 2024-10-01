import { Spin } from 'antd';
import Link from 'next/link';
import React from 'react';
import { MdAssignmentAdd, MdLiveTv } from 'react-icons/md';
import { SiTestcafe } from 'react-icons/si';
import { colors } from '../../../../src/data/data';
import useEnrolledCourseData from '../../../../src/hooks/useEnrolledCourseData';
import {
  calculateDaysBetween,
  formatDateWithoutYear,
} from '../../../../src/utils/convertDate';
import ModuleFeedback from './ModuleFeedback';

const ModuleEnrolled = () => {
  const { enrolledCourse } = useEnrolledCourseData();

  return (
    <>
      {enrolledCourse?.course_modules ? (
        <div className="grid grid-cols-2 gap-4">
          {enrolledCourse?.course_modules?.map((item, index) => (
            <div
              key={item.id}
              className={`${
                item.moduleStatus == 'running'
                  ? 'bg-primary_btn text-white'
                  : ''
              } px-5 py-7  rounded-md cursor-pointer border-[2px] hover:border-[#56d478]`}
            >
              <div className="w-full flex items-center gap-4 ">
                <div
                  style={{ backgroundColor: colors[index] }}
                  className={`p-2 rounded-lg text-white text-center text-base font-normal`}
                >
                  <p className="m-0 text-sm">Module</p>
                  <p className="m-0 font-bold">{item.moduleNumber}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className=" bg-gray-300 px-2 py-0.5 text-xs rounded">
                      {formatDateWithoutYear(item?.lessons[0].classDate)} -{' '}
                      {formatDateWithoutYear(item?.lessons?.at(-1).classDate)}
                    </p>

                    {item.moduleStatus == 'finished' ? (
                      <p
                        className="ml-auto text-xs bg-[#daffe8] text-green-600 px-2 py-0.5 
                  rounded-2xl border border-[#22c55e]"
                      >
                        Finished
                      </p>
                    ) : item.moduleStatus == 'running' ? (
                      <p className="ml-auto text-xs bg-orange-500 px-2 py-0.5 rounded-2xl">
                        Ongoing
                      </p>
                    ) : (
                      <p
                        className="ml-auto text-xs bg-[#fff1da] text-orange-400 px-2 py-0.5 
                  rounded-2xl border border-[#ff893b]"
                      >
                        Upcoming
                      </p>
                    )}
                  </div>
                  <p className="text-xs font-semibold">
                    {calculateDaysBetween(
                      item?.lessons[0].classDate,
                      item?.lessons?.at(-1).classDate,
                    )}{' '}
                    Days
                  </p>
                </div>
              </div>
              <div
                className={`${
                  item.moduleStatus == 'running' ? 'bg-white' : 'bg-[#c7c7c7]'
                } h-[.5px] my-[14px]`}
              />
              <h2 className="text-xl font-bold leading-6 ">
                {item.moduleName}
              </h2>
              <div className="flex mt-10 mb-5 gap-4">
                <div className="flex items-center gap-2">
                  <MdLiveTv className="" />
                  <p className="text-sm font-semibold ">
                    {item?.liveClassNumber} Live Class
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MdAssignmentAdd className="" />
                  <p className="text-sm font-semibold ">
                    {item?.projectNumber || 0} Project
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SiTestcafe className="" />
                  <p className="text-sm font-semibold ">0 Test</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/students/my-course/${enrolledCourse?.unique_batch_id}/module/${item.id}`}
                  className="flex justify-center items-center gap-2 text-black bg-[#eaecf0] hover:bg-[#d0d3d8] font-semibold
              py-2 px-4 rounded border transition-all duration-200 w-full"
                >
                  Study Plan
                </Link>
                <ModuleFeedback item={item} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="min-h-40 flex justify-center items-center bg-white">
          <Spin size="medium" />
        </div>
      )}
    </>
  );
};

export default ModuleEnrolled;
