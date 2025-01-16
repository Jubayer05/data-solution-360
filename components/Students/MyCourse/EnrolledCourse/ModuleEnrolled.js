import { Spin } from 'antd';
import { Coffee, FilePlus, Tv } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {enrolledCourse?.course_modules?.map((item, index) => (
            <div
              key={item.id}
              className={`${
                item.moduleStatus === 'running'
                  ? 'bg-primary_btn text-white'
                  : ''
              } p-[10px] md:p-5 rounded-md cursor-pointer border-2 hover:border-[#56d478] transition-all`}
            >
              <div className="flex items-center gap-1.5 md:gap-4">
                <div
                  style={{ backgroundColor: colors[index] }}
                  className={`p-1 md:p-2 rounded-lg text-white text-center text-base font-normal`}
                >
                  <p className="m-0 text-xs md:text-sm">Module</p>
                  <p className="m-0 font-bold">{item.moduleNumber}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {item?.lessons[0].classDate &&
                      item?.lessons?.at(-1).classDate && (
                        <p className="bg-gray-300 px-1.5 md:px-2 py-0.5 text-xs rounded">
                          {formatDateWithoutYear(item?.lessons[0].classDate)} -{' '}
                          {formatDateWithoutYear(
                            item?.lessons?.at(-1).classDate,
                          )}
                        </p>
                      )}

                    {item.moduleStatus === 'finished' ? (
                      <p className="ml-auto text-xs bg-[#daffe8] text-green-600 px-2 py-0.5 rounded-2xl border border-[#22c55e]">
                        Finished
                      </p>
                    ) : item.moduleStatus === 'running' ? (
                      <p className="ml-auto text-xs bg-orange-500 px-2 py-0.5 rounded-2xl">
                        Ongoing
                      </p>
                    ) : (
                      <p className="ml-auto text-xs bg-[#fff1da] text-orange-400 px-2 py-0.5 rounded-2xl border border-[#ff893b]">
                        Upcoming
                      </p>
                    )}
                  </div>
                  {item?.lessons[0].classDate &&
                    item?.lessons?.at(-1).classDate && (
                      <p className="text-xs font-semibold">
                        {calculateDaysBetween(
                          item?.lessons[0].classDate,
                          item?.lessons?.at(-1).classDate,
                        )}{' '}
                        Days
                      </p>
                    )}
                </div>
              </div>
              <div
                className={`${
                  item.moduleStatus === 'running' ? 'bg-white' : 'bg-[#c7c7c7]'
                } h-[0.5px] my-4`}
              />
              <h2 className="text-lg md:text-xl font-bold leading-6">
                {item.moduleName}
              </h2>
              <div className="flex mt-4 mb-2 gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Tv className="text-xl" />
                  <p className="text-sm font-semibold ">
                    {item?.liveClassNumber} Live Class
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FilePlus className="text-xl" />
                  <p className="text-sm font-semibold ">
                    {item?.projectNumber || 0} Project
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="text-xl" />
                  <p className="text-sm font-semibold ">0 Test</p>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href={`/students/my-course/${enrolledCourse?.unique_batch_id}/module/${item.id}`}
                  className="flex justify-center items-center gap-2 text-black bg-[#eaecf0] hover:bg-[#d0d3d8] font-semibold py-2 px-4 rounded border transition-all duration-200 w-full"
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
