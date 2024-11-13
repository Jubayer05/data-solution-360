import React from 'react';
import { convertToAMPM } from '../../../src/utils/convertAMPM';
import { formatDateWithoutYear, isToday } from '../../../src/utils/convertDate';

const TodayClassRight = ({ item }) => {
  const currentModule = item?.course_modules.find(
    (item) => item.moduleStatus === 'running',
  );

  const currentLesson = currentModule?.lessons.find((lessonItem) =>
    isToday(lessonItem.classDate),
  );

  return (
    <div>
      {currentLesson ? (
        <>
          <h4 className="text-[20px] font-bold mb-4">
            Today&apos;s class ({formatDateWithoutYear(currentLesson.classDate)}
            )
          </h4>
          <div className="flex justify-center items-center gap-2">
            <p
              className="font-medium text-center leading-[19px] tracking-[0.02em] text-[13px]
              bg-[#6886ff2d] p-1 rounded-md border border-[#3d5a99] w-[100px]"
            >
              Batch-{item?.batchNumber}
            </p>
            <p className="text-xs">{item?.courseData?.item_name}</p>
          </div>
          <div className="border py-3 px-4 rounded-lg mt-5">
            <div className="flex flex-wrap gap-x-1 text-xs">
              <span className="text-green-500">
                Module {currentModule?.moduleNumber}{' '}
              </span>{' '}
              <span className="text-[orangered]">
                • {currentLesson?.classType}
              </span>{' '}
              <span className="text-gray-700">• Instructor: </span>
              <span>{currentLesson?.instructorForClass?.profileName}</span>
            </div>
            <p className="text-base font-bold leading-5 mt-1 mb-3 text-gray-600">
              Topic: {currentLesson?.title}
            </p>
            <button
              className="px-4 py-3 bg-primary_btn text-white rounded flex items-center 
              justify-center gap-2 w-full"
            >
              Class will start {convertToAMPM(currentLesson?.classTime)}
            </button>
          </div>
        </>
      ) : (
        <div>
          <h4 className="text-[20px] font-bold mb-4">
            Today&apos;s class ({formatDateWithoutYear(new Date())})
          </h4>
          <div className="flex justify-center items-center gap-2">
            <p
              className="font-medium text-center leading-[19px] tracking-[0.02em] text-[13px]
              bg-[#6886ff2d] p-1 rounded-md border border-[#3d5a99] w-[100px]"
            >
              Batch-{item?.batchNumber}
            </p>
            <p className="text-xs">{item?.courseData?.item_name}</p>
          </div>
          <p className="text-center text-lg text-gray-600 font-semibold mt-6">
            There is no live class today.
          </p>
        </div>
      )}
    </div>
  );
};

export default TodayClassRight;
