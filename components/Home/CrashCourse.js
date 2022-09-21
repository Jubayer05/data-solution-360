/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { crashCourseData } from "../../src/data/data";
import { GiAerialSignal } from "react-icons/gi";
import { BsPlayCircle } from "react-icons/bs";
import { useStateContext } from "../../src/context/ContextProvider";
import Link from "next/link";

const CrashCourse = () => {
  const { language } = useStateContext();

  console.log(language);

  return (
    <div className="bg-slate-100	mt-16">
      <div className="max-w-6xl py-10 mx-auto">
        <h2 className="text-center text-4xl font-bold  mb-6">
          {language === "English" ? (
            "Best Courses for you"
          ) : (
            <span className="font-bangla">আপনার জন্য সেরা কোর্স</span>
          )}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
          {crashCourseData.map((item) => (
            <CrashCourseItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrashCourse;

const CrashCourseItem = ({ item }) => {
  return (
    <div className="w-5/6 sm:w-full mx-auto rounded-lg overflow-hidden sm:mx-2 hover:-translate-y-3 hover:shadow-xl transition-translate duration-300 cursor-pointer mt-4">
      <img src={item.img} alt="" className="w-full h-72" />
      {/* <h2 className="text-xl font-semibold text-center my-5">
        <Link href={item?.link}>
          <a className="text-gray-600">{item.title}</a>
        </Link>
      </h2> */}

      {/* <div className="flex items-center px-3">
        <GiAerialSignal />
        <span className="ml-3">{item.point1}</span>
      </div>
      <div className="flex items-center px-3 mt-2">
        <BsPlayCircle />
        <span className="ml-3">{item.point2}</span>
      </div>

      <div className="mt-5 py-4 border-t-1 text-center">
        <span className="font-bold text-green-700 hover:text-green-800">
          Join Now
        </span>
      </div> */}
    </div>
  );
};
