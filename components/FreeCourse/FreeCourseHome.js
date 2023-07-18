/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { freeCourseData } from '../../src/data/data';

const FreeCourseHome = () => {
  return (
    <div className="max-w-6xl mx-auto py-3">
      {/* Available course */}
      <h2 className="font-heading text-3xl">Available Free Courses for you</h2>
      {freeCourseData?.map((item) => (
        <FreeCourseItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default FreeCourseHome;

const FreeCourseItem = ({ item }) => {
  const progressBarStyle = {
    width: '300px',
    borderRadius: '10px',
  };
  return (
    // <div className="hello w-[300px] rounded-lg overflow-hidden border-1">
    //   <img className="w-[300px]" src="/course/free-course-1.jpg" alt="" />
    //   <div className="p-3">
    //     <h2 className="font-heading text-lg">
    //       Complete Data analyst boot-camp{' '}
    //     </h2>
    //     <div className="flex justify-center">
    //       <Progress
    //         percent={0}
    //         strokeWidth={10}
    //         strokeColor="#276ef1"
    //         trailColor="#dddddd"
    //         strokeLinecap="round"
    //         style={progressBarStyle}
    //       />
    //     </div>
    //   </div>
    //   <div className="mt-2 border-t-1">
    //     <p className=" font-heading text-center pt-3 cursor-pointer">
    //       <Link href={item.link}>
    //         <a className="text-[#288b79] visited:text-[#288b79] font-bold">
    //           Continue
    //         </a>
    //       </Link>
    //     </p>
    //   </div>
    // </div>
    <div className="h-[50vh] flex justify-center items-center">
      <h1 className="text-3xl font-bold font-heading text-center">
        Coming soon!
      </h1>
    </div>
  );
};
