import Image from 'next/image';
import React, { useState } from 'react';
import { FaCalendarDay, FaCalendarDays } from 'react-icons/fa6';
import { FiClock } from 'react-icons/fi';
import { LuCalendarDays } from 'react-icons/lu';
import { convertToAMPM } from '../../../src/utils/convertAMPM';
import { formatDate, getFullDayName } from '../../../src/utils/convertDate';
import useIsToday from '../../../src/utils/useIsToday';
import CustomModal from '../../utilities/CustomModal';

const ClassJoiningItem = ({ item }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const currentModule = item?.course_modules.find(
    (item) => item.moduleStatus == 'running',
  );

  console.log(item?.courseData?.class_days);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="my-5 px-0 md:px-8">
      <div className="flex flex-wrap flex-col md:flex-row justify-start items-start gap-2 md:gap-4 lg:gap-[10px]">
        <p className="font-bold text-[20px] sm:text-[26px] flex-1">
          {item?.courseData?.item_name}
        </p>
        <p className="font-medium text-center text-[10px] sm:text-[12px] text-white bg-secondary_btn px-2 py-1 rounded-md">
          Module {currentModule?.moduleNumber}
        </p>
        <p className="font-medium text-center text-[11px] sm:text-[13px] bg-[#85ffc82d] px-2 py-1 rounded-md border border-[#3d9970]">
          Batch-{item?.batchNumber}
        </p>
        <CustomModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          setModalIsOpen={setModalIsOpen}
        >
          <h2 className="font-bold text-[20px] sm:text-[24px] text-center mt-4 sm:mt-10">
            {item?.courseData?.item_name}
          </h2>
          <div className="flex justify-center items-center mt-4">
            <p className="font-medium text-center text-[12px] sm:text-[13px] bg-[#85ffc82d] px-2 py-1 rounded-md border border-[#3d9970]">
              Batch-{item?.batchNumber}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-20 mt-6 mb-6">
            <div className="border-l pl-4">
              <h4 className="mb-2 sm:mb-3 text-center sm:text-left">
                Main Class
              </h4>
              {item?.courseData?.class_days?.map((dayItem) => (
                <div key={dayItem} className="flex gap-2 items-center">
                  <FaCalendarDays className="text-green-500" />
                  <p>
                    {getFullDayName(dayItem)}, {item?.courseData?.class_time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CustomModal>
        <button
          onClick={openModal}
          className="flex justify-center items-center gap-2 bg-hover_btn hover:bg-[#fecb63] font-semibold py-2 px-3 sm:px-4 rounded border-orange-400 border text-xs sm:text-sm"
        >
          Class Routine <FaCalendarDay />
        </button>
      </div>

      <p className="text-sm sm:text-base font-medium mt-2 mb-3 text-[#1e1a35]">
        Class Schedule of Module - {currentModule?.moduleNumber}
      </p>
      <div className="bg-[#d3ffd3ac] p-3 sm:p-4 rounded-2xl">
        <div className="flex gap-4 items-center">
          <Image
            width={500}
            height={300}
            src="/icon/live.png"
            className="w-[18px] sm:w-[20px]"
            alt=""
          />
          <p className="text-[16px] sm:text-[20px] font-semibold">Live Class</p>
        </div>

        {currentModule?.lessons.map((moduleItem) => (
          <div
            key={moduleItem.id}
            className="flex flex-wrap md:flex-nowrap justify-between items-center rounded-lg border bg-white p-4 gap-4 my-4"
          >
            <div className="w-full md:w-[55%]">
              <h2 className="text-[18px] sm:text-[22px] font-semibold pb-3">
                {moduleItem.title}
              </h2>
              <div className="flex gap-1 md:gap-2 flex-col md:flex-row items-start md:items-center">
                <strong className="text-gray-500">Instructor:</strong>
                <p>{moduleItem?.instructorForClass?.profileName}</p>
              </div>
            </div>
            <div className="w-full md:w-[45%] flex flex-wrap gap-3 md:gap-2 items-center justify-between">
              <div className="flex gap-2 items-center">
                <LuCalendarDays className="text-[#f16e3e]" />
                <p className="text-[#f16e3e] font-medium text-sm">
                  {formatDate(moduleItem?.classDate)}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <FiClock className="text-[#f16e3e]" />
                <p className="text-[#f16e3e] font-medium text-sm">
                  {convertToAMPM(moduleItem?.classTime)}
                </p>
              </div>
              <HandleButton moduleItem={moduleItem} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassJoiningItem;

const HandleButton = ({ moduleItem }) => {
  const classToday = useIsToday(moduleItem?.classDate);
  return (
    <div>
      {moduleItem?.liveClassLink && moduleItem?.classFinished ? (
        <button className="px-4 py-2 md:py-3 bg-primary_btn text-white rounded flex items-center justify-center gap-2 text-sm">
          Class Finished
        </button>
      ) : moduleItem?.liveClassLink && classToday ? (
        <button className="px-4 py-2 md:py-3 bg-primary_btn text-white rounded flex items-center justify-center gap-2 text-sm">
          Join Live Class
        </button>
      ) : moduleItem?.liveClassLink && classToday === false ? (
        <span className="bg-purple-100 border border-purple-500 px-2 text-xs rounded-full font-semibold text-[#6b46c1]">
          Upcoming
        </span>
      ) : (
        ''
      )}
    </div>
  );
};
