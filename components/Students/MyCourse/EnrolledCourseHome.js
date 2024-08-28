import React from 'react';
import { IoIosPeople } from 'react-icons/io';
import Typewriter from 'typewriter-effect';

import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';
import { ImClock } from 'react-icons/im';

const EnrolledCourseHome = ({ item }) => {
  return (
    <div
      className="w-full mx-auto rounded-lg overflow-hidden hover:border-[#676767] 
    transition-border duration-300 cursor-pointer relative bg-white border"
    >
      <Link href={`/students/my-course/${item.key}`}>
        <Image
          width={500}
          height={300}
          src={item.img}
          alt=""
          className="w-full h-[240px] md:h-[200px]"
        />
        <div className="rounded-lg rounded-t-none flex flex-col h-[calc(100%-240px)] md:h-[calc(100%-200px)]">
          <div className="p-0.5 md:p-2 border-b-1 border-[#d6dae1] flex items-center flex-wrap">
            <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded">
              <span className="text-[#101828] text-[10px] md:text-[12px] block -mt-[1px]">
                Batch <strong>{item?.batch_no}</strong>
              </span>
            </div>
            <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded flex items-center gap-1 text-[#101828]">
              <IoIosPeople />

              <span className="text-[10px] md:text-[12px] block -mt-[1px]">
                Total Seat <strong>{item?.total_seat_number}</strong>
              </span>
            </div>

            {new Date(item?.main_class_starting_date).getTime() >=
              new Date().getTime() && (
              <div className="py-1 px-2 m-0.5 md:m-1 bg-[#eaecf0] rounded flex items-center gap-1 text-[#101828]">
                <ImClock />
                <span className="text-[10px] md:text-[12px] -mt-[1px]">
                  <strong>
                    {' '}
                    {new Date(item?.main_class_starting_date).getTime() >=
                    new Date().getTime()
                      ? Math.ceil(
                          (new Date(item?.main_class_starting_date).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        )
                      : 0}
                  </strong>
                  Days Left
                </span>
              </div>
            )}
          </div>
          <p
            className="flex-1 text-base leading-5 md:text-lg font-bold mb-1.5 mt-2 text-[#140342]
          px-1 md:px-4"
          >
            {item.title}
          </p>
          {item?.status == 'Registration Going on' && (
            <div className="text-xl">
              <p
                className=" flex-1 text-[13px] md:text-lg font-bold mb-1.5 md:mt-1 
          px-1 md:px-4 text-[#39b94a] text-center"
              >
                <Typewriter
                  options={{
                    strings: ['Registration Going on', 'Registration Going on'],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 15,
                  }}
                />
              </p>
            </div>
          )}
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
