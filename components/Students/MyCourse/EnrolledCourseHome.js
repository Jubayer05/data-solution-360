import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

const EnrolledCourseHome = ({ item }) => {
  return (
    <div
      className="w-full mx-auto rounded-lg overflow-hidden hover:border-[#676767] 
    transition-border duration-300 cursor-pointer relative bg-white border"
    >
      <Link href={`/students/my-course/${item.unique_batch_id}`}>
        <Image
          width={500}
          height={300}
          src={item?.courseData?.img}
          alt=""
          className="w-full h-[240px] md:h-[160px]"
        />
        <div className="rounded-lg rounded-t-none flex flex-col h-[calc(100%-240px)] md:h-[calc(100%-200px)]">
          <div className="p-0.5 md:p-2 border-b-1 border-[#d6dae1] flex items-center flex-wrap">
            <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded">
              <span className="text-[#101828] text-[10px] md:text-[12px] block -mt-[1px]">
                Batch <strong>{item?.courseData?.batch_no}</strong>
              </span>
            </div>
          </div>
          <p
            className="flex-1 text-xs leading-5 font-bold mb-1.5 mt-2 text-[#140342]
          px-1 md:px-4"
          >
            {item?.courseData?.item_name}
          </p>
          <div
            className="flex justify-end font-medium text-[14px] flex-wrap text-[#4F547B]
            bg-[#f9f9fa] py-4 px-2"
          >
            <button
              className="w-full px-4 py-3 bg-primary_btn hover:bg-[#001f3fd6] text-white flex items-center rounded-md
            justify-center gap-2"
            >
              Continue <FaArrowRightLong />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EnrolledCourseHome;
