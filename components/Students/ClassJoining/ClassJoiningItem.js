import Image from 'next/image';
import React, { useState } from 'react';
import { FaCalendarDay, FaCalendarDays } from 'react-icons/fa6';
import { FiClock } from 'react-icons/fi';
import { LuCalendarDays } from 'react-icons/lu';
import CustomModal from '../../utilities/CustomModal';

const ClassJoiningItem = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const listItem = [
    {
      id: '1',
      title: 'Day 01: Mastering Social Media',
    },
    {
      id: '2',
      title: 'Day 02: Mastering Social Media the next level',
    },
  ];

  return (
    <div className="my-5 px-0 md:px-8">
      <div className="flex flex-wrap flex-col md:flex-row justify-start items-start gap-2 md:gap-4 lg:gap-[10px]">
        <p className="font-bold text-[20px] sm:text-[26px] flex-1">
          Mastering Social Media Banner Design: The Next Level
        </p>
        <p className="font-medium text-center text-[10px] sm:text-[12px] text-white bg-secondary_btn px-2 py-1 rounded-md">
          Module 11
        </p>
        <p className="font-medium text-center text-[11px] sm:text-[13px] bg-[#85ffc82d] px-2 py-1 rounded-md border border-[#3d9970]">
          Batch-1
        </p>
        <CustomModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          setModalIsOpen={setModalIsOpen}
        >
          <h2 className="font-bold text-[20px] sm:text-[24px] text-center mt-4 sm:mt-10">
            Mastering Social Media Banner Design: The Next Level
          </h2>
          <div className="flex justify-center items-center mt-4">
            <p className="font-medium text-center text-[12px] sm:text-[13px] bg-[#85ffc82d] px-2 py-1 rounded-md border border-[#3d9970]">
              Batch-1
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-20 mt-6 mb-6">
            <div className="border-l pl-4">
              <h4 className="mb-2 sm:mb-3 text-center sm:text-left">
                Main Class
              </h4>
              <div className="flex gap-2 items-center">
                <FaCalendarDays className="text-green-500" />
                <p>Saturday, 9PM</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaCalendarDays className="text-green-500" />
                <p>Thursday, 9PM</p>
              </div>
            </div>
            <div className="border-l pl-4">
              <h4 className="mb-2 sm:mb-3 text-center sm:text-left">
                Support Class
              </h4>
              <div className="flex gap-2 items-center">
                <FaCalendarDays className="text-green-500" />
                <p>Sunday, 9PM</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaCalendarDays className="text-green-500" />
                <p>Monday, 9PM</p>
              </div>
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
        Class Schedule of Module - 11
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

        {listItem.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap md:flex-nowrap justify-between items-center rounded-lg border bg-white p-4 gap-4 my-4"
          >
            <div className="w-full md:w-[55%]">
              <h2 className="text-[18px] sm:text-[22px] font-semibold pb-3">
                {item.title}
              </h2>
              <div className="flex gap-1 md:gap-2 flex-col md:flex-row items-start md:items-center">
                <strong className="text-gray-500">Instructor:</strong>
                <p>Sakib Tarafdar</p>
              </div>
            </div>
            <div className="w-full md:w-[45%] flex flex-wrap gap-3 md:gap-2 items-center justify-between">
              <div className="flex gap-2 items-center">
                <LuCalendarDays className="text-[#f16e3e]" />
                <p className="text-[#f16e3e] font-medium text-sm">
                  Saturday, 6 July
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <FiClock className="text-[#f16e3e]" />
                <p className="text-[#f16e3e] font-medium text-sm">9.00 PM</p>
              </div>
              <button className="px-4 py-2 md:py-3 bg-primary_btn text-white rounded flex items-center justify-center gap-2 text-sm">
                Join Live Class
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassJoiningItem;
