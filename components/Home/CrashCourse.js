/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { crashCourseData } from "../../data/data";
import { GiAerialSignal } from "react-icons/gi";
import { BsPlayCircle } from "react-icons/bs";
import { useStateContext } from "../../context/contextProvider";

const CrashCourse = () => {
  const { language } = useStateContext();

  console.log(language);

  return (
    <div className="max-w-6xl py-10 mx-auto">
      <h2 className="text-center text-4xl font-bold mt-16 mb-6">
        {language === "English" ? (
          "Best Courses for you"
        ) : (
          <span className="font-bangla">আপনার জন্য সেরা কোর্স</span>
        )}
      </h2>
      <div className="flex justify-center ">
        {crashCourseData.map((item) => (
          <CrashCourseItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CrashCourse;

const CrashCourseItem = ({ item }) => {
  return (
    <div className="rounded-lg overflow-hidden mx-2 border-1 hover:-translate-y-5 transition-translate duration-300 cursor-pointer">
      <img src={item.img} alt="" className="w-96 h-60" />
      <h2 className="text-xl font-semibold text-center my-5">{item.title}</h2>

      <div className="flex items-center px-3">
        <GiAerialSignal />
        <span className="ml-3">{item.point1}</span>
      </div>
      <div className="flex items-center px-3 mt-2">
        <BsPlayCircle />
        <span className="ml-3">{item.point1}</span>
      </div>

      <div className="mt-5 py-4 border-t-1 text-center">
        <span className="font-bold text-green-700 hover:text-green-800">
          Join Now
        </span>
      </div>
    </div>
  );
};
