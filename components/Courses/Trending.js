/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { useStateContext } from '../../src/context/ContextProvider';

const Trending = () => {
  const { trendingCourse } = useStateContext();
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h2 className="text-center text-3xl font-bold font-heading mt-16 text-headerMain">
        Trending Course
      </h2>
      <img
        className="w-full rounded-lg shadow-lg"
        src={trendingCourse[0]?.photoUrl}
        alt="trending course"
      />
      <div className="flex justify-center mt-10">
        <Link href={trendingCourse[0]?.trendingCourseLink || '#'}>
          <button
            className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center text-white rounded-md mt-2
          bg-[#d6295f] transition-all duration-300 ease-linear `}
          >
            Click Here for Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Trending;
