/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect } from "react";
import { crashCourseData } from "../../src/data/data";

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug = window.location.href.split("/").slice(-1)[0];
      const item = crashCourseData.find((item) => item.slug === slug);
      setCourseDetails(item);
    }
  }, []);

  return (
    <div className="pt-24 max-w-2xl mx-auto p-5">
      <h2 className="text-center text-4xl underline">{courseDetails.title}</h2>

      <img src={courseDetails.img} alt="" />
      <p className="text-xl font-bold mt-8">Details:</p>
      <p className="text-lg -mt-3">{courseDetails.details}</p>

      <p className="text-xl font-bold mt-8">Opportunity: </p>
      <p className="text-lg">{courseDetails.additional}</p>
    </div>
  );
};

export default CourseDetails;
