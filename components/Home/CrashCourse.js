/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { AiOutlineFileText, AiOutlineClockCircle } from "react-icons/ai";
import { BiBarChart, BiDollar } from "react-icons/bi";
import { TbCurrencyTaka } from "react-icons/tb";

import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { useStateContext } from "../../src/context/ContextProvider";
import Link from "next/link";
import firebase from "../../firebase";
import { Avatar } from "antd";
const db = firebase.firestore();

const CrashCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const { language } = useStateContext();

  useEffect(() => {
    db.collection("course_data").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourseData(data);
    });
  }, []);

  console.log(language);

  return (
    <div className="bg-[#ffffff]	pt-8">
      <div className="max-w-[1290px] py-10 mx-auto">
        <h2 className="text-center text-3xl font-bold font-heading mt-16 mb-6 text-headerMain">
          {language === "English" ? (
            "Best Courses for you"
          ) : (
            <span className="font-bangla">আপনার জন্য সেরা কোর্স</span>
          )}
        </h2>
        <p className="text-center font-bold font-heading  mb-16 text-headerMain	">
          At this moment Data Solution - 360 provides this following courses for
          you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5">
          {courseData.map((item) => (
            <CrashCourseItem key={item.id} item={item} />
          ))}
          {/* {courseData.map((item) => (
            <CrashCourseItem key={item.id} item={item} />
          ))}
          {courseData.map((item) => (
            <CrashCourseItem key={item.id} item={item} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default CrashCourse;

const CrashCourseItem = ({ item }) => {
  return (
    <div className=" sm:w-full mx-auto rounded-lg overflow-hidden sm:mx-2 hover:-translate-y-3 hover:shadow-xl transition-translate duration-300 cursor-pointer mt-4">
      <img src={item.img} alt="" className="w-full h-48" />
      <div className="px-4 py-3 border-1 rounded-lg rounded-t-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-[orange] font-heading mr-2">4.7</span>
            <div className="flex text-[orange] ">
              <BsStarFill className="mx-[1px]" />
              <BsStarFill className="mx-[1px]" />
              <BsStarFill className="mx-[1px]" />
              <BsStarHalf className="mx-[1px]" />
              <BsStar className="mx-[1px]" />
            </div>
            <div className="font-bold ml-1 text-gray-500">(3)</div>
          </div>
          <div className="flex items-center text-[#4F547B]">
            <BiBarChart className="mr-0.5" />
            <span>{item.difficulty}</span>
          </div>
        </div>
        <p className="inline-block text-lg font-semibold mb-1.5 mt-2 text-[#140342] hover:text-[#6440FB]">
          {item.title}
        </p>
        <div className="flex items-center font-medium text-[14px] flex-wrap text-[#4F547B]">
          <div className="flex items-center">
            <AiOutlineFileText className="mr-1" />
            <span className="">{item.lesson} Lessons</span>
          </div>
          <div className="flex items-center mx-2">
            <AiOutlineClockCircle className="mr-1" />
            <span>{item.duration} Days</span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-slate-200 mt-4 mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar />
            <span className="ml-2">{item.author}</span>
          </div>
          <div>
            <span className="flex items-center font-bold text-lg text-[#42476f]">
              <TbCurrencyTaka />
              {item.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
