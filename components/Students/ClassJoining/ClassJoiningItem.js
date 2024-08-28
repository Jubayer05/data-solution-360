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
    <div className="my-5">
      <div className="flex items-center gap-[10px]">
        <p className="font-bold leading-[130%] text-[26px] flex-1">
          Mastering Social Media Banner Design: The Next Level
        </p>
        <p
          className="font-medium text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
        text-[12px] text-white bg-secondary_btn px-2 py-1 rounded-md"
        >
          Module 11
        </p>
        <p
          className="font-medium text-center leading-[19px] tracking-[0.02em] flex justify-center items-center 
        text-[13px] bg-[#85ffc82d] px-2 py-1 rounded-md border border-[#3d9970]"
        >
          Batch-1
        </p>
        <CustomModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          setModalIsOpen={setModalIsOpen}
        >
          <h2 className="font-bold leading-[130%] text-[24px] flex-1 text-center mt-10">
            Mastering Social Media Banner Design: The Next Level
          </h2>
          <div className="flex justify-center items-center mt-4">
            <p
              className="font-medium text-center leading-[19px] tracking-[0.02em] 
            text-[13px] bg-[#85ffc82d] px-2 py-1 rounded-md border border-[#3d9970] inline-block"
            >
              Batch-1
            </p>
          </div>
          <div className="flex justify-center mt-10 mb-6 gap-20">
            <div className="border-l pl-4">
              <h4 className="mb-3">Main Class</h4>
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
              <h4 className="mb-3">Support Class</h4>
              <div className="flex gap-2 items-center">
                <FaCalendarDays className="text-green-500" />
                <p>Sunday, 9PM</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaCalendarDays className="text-green-500" />
                <p>Monday, 9PM</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaCalendarDays className="text-green-500" />
                <p>Saturday, 9PM</p>
              </div>
              <div className="flex gap-2 items-center">
                <FaCalendarDays className="text-green-500" />
                <p>Saturday, 9PM</p>
              </div>
            </div>
          </div>
        </CustomModal>
        <button
          onClick={openModal}
          className="flex justify-center items-center gap-2 bg-hover_btn hover:bg-[#fecb63] font-semibold
          py-2 px-4 rounded border-orange-400 border "
        >
          Class Routine <FaCalendarDay />
        </button>
      </div>

      <p className="text-base font-medium leading-6 mt-2 mb-3 text-[#1e1a35]">
        Class Schedule of Module - 11
      </p>
      <div className="bg-[#d3ffd3ac] p-4 rounded-2xl">
        <div className="flex gap-4 items-center">
          <Image
            width={500}
            height={300}
            src="/icon/live.png"
            className="w-[20px]"
            alt=""
          />
          <p className="text-[20px] font-semibold ">Live Class</p>
        </div>

        {listItem.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center self-stretch rounded-lg border bg-white p-4 gap-4 my-4"
          >
            <div className="w-[55%]">
              <h2
                className="text-[22px] font-semibold pb-3
            "
              >
                {item.title}
              </h2>
              <div className="flex gap-2 items-center">
                <strong className="text-gray-500">Instructor: </strong>
                <p>Sakib Tarafdar</p>
              </div>
            </div>
            <div className="w-[45%] flex items-center gap-2 justify-between">
              <div className="flex gap-2 items-center">
                <LuCalendarDays className="text-[#f16e3e]" />
                <p className="text-[#f16e3e] font-medium">Saturday, 6 July </p>
              </div>
              <div className="flex gap-2 items-center">
                <FiClock className="text-[#f16e3e]" />
                <p className="text-[#f16e3e] font-medium">9.00 PM </p>
              </div>
              <button
                className="px-4 py-3 bg-primary_btn text-white rounded flex items-center 
            justify-center gap-2"
              >
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
