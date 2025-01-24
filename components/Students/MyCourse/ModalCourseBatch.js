import { Tag } from 'antd';
import { BookOpenIcon, CalendarDaysIcon } from 'lucide-react';
import React, { useState } from 'react';
import CustomModal from '../../utilities/CustomModal';

const getFullDayName = (dayAbbr) => {
  const dayMap = {
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday',
    Sun: 'Sunday',
  };
  return dayMap[dayAbbr] || dayAbbr;
};

const CourseBatchModal = ({ courseDataBatch }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <CustomModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setModalIsOpen={setModalIsOpen}
      >
        {courseDataBatch?.map((item) => (
          <div
            key={item?.id}
            className="relative p-6 overflow-hidden mx-5
                       bg-white rounded-2xl shadow-md
                       border-1 border-gray-100 mt-5"
          >
            {/* Subtle Background Gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-br 
                         from-blue-50/30 to-blue-100/30 
                         opacity-50 -z-10"
            />

            {/* Course Header */}
            <div className="text-center mb-6 relative">
              <div className="flex justify-center items-center mb-3">
                <BookOpenIcon className="text-blue-500 mr-3 w-8 h-8 " />
                <h2 className="w-[98%] text-2xl font-bold tracking-tight">
                  {item?.courseData?.item_name}
                </h2>
              </div>

              <Tag
                color="blue"
                className="text-sm px-3 py-1 rounded-full 
                           font-medium shadow-sm"
              >
                Batch-{item?.batchNumber}
              </Tag>
            </div>

            {/* Class Schedule */}
            <div
              className="bg-white rounded-lg p-5 
                         border border-gray-200 
                         transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <CalendarDaysIcon className="text-blue-600 mr-3 w-6 h-6 " />
                <h3 className="text-xl font-semibold text-gray-800">
                  Class Schedule
                </h3>
              </div>

              <div className="space-y-3">
                {item?.courseData?.class_days?.map((dayItem) => (
                  <div
                    key={dayItem}
                    className="flex justify-between items-center 
                               bg-blue-50 p-3 rounded-lg 
                               hover:bg-blue-100 
                               transition-colors duration-300 
                               cursor-pointer"
                  >
                    <div className="flex items-center">
                      <CalendarDaysIcon className="text-green-500 mr-3 w-5 h-5" />
                      <span className="font-medium text-gray-700">
                        {getFullDayName(dayItem)}
                      </span>
                    </div>
                    <span
                      className="text-sm text-gray-600 
                                     bg-white px-2 py-1 
                                     rounded-full shadow-sm"
                    >
                      {item?.courseData?.class_time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CustomModal>

      <div className="flex justify-center mb-5">
        <button
          onClick={() => setModalIsOpen(true)}
          className="flex items-center gap-2 
        bg-gradient-to-r from-orange-500 to-orange-600 
        text-white font-semibold 
        py-3 px-5 rounded-md 
        shadow-md hover:shadow-xl 
        transition-all duration-300 
        transform hover:-translate-y-1 
        active:scale-95"
        >
          Class Routine <CalendarDaysIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default CourseBatchModal;
