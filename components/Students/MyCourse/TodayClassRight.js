import React from 'react';

const TodayClassRight = () => {
  return (
    <div>
      <h4 className="text-[20px] font-bold mb-4">
        Today&apos;s classes (6 July)
      </h4>
      <div className="flex justify-center items-center gap-2">
        <p
          className="font-medium text-center leading-[19px] tracking-[0.02em] text-[13px]
         bg-[#6886ff2d] px-2 py-1 rounded-md border border-[#3d5a99] w-24"
        >
          Batch-1
        </p>
        <p className="text-xs">
          Mastering Social Media Banner Design: The Next Level
        </p>
      </div>
      <div className="border py-3 px-4 rounded-lg mt-5">
        <div className="flex flex-wrap gap-x-1 text-xs">
          <span className="text-green-500">Module 11 </span>{' '}
          <span className="text-[orangered]">• Live Class</span>
          <span className="text-gray-700">• Instructor: </span>
          <span>Sakib Tarafdar</span>
        </div>
        <p className="text-base font-bold leading-5 mt-1 mb-3 text-gray-600">
          Topic: Product Manupulation for Data Solution 360
        </p>
        <button
          className="px-4 py-3 bg-primary_btn text-white rounded flex items-center 
            justify-center gap-2 w-full"
        >
          Class will start 9PM
        </button>
      </div>
    </div>
  );
};

export default TodayClassRight;
