/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect } from "react";
import { crashCourseData } from "../../src/data/data";
import { useStateContext } from "../../src/context/ContextProvider";

const CourseDetails = () => {
  const { courseData } = useStateContext();
  const [courseDetails, setCourseDetails] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const slug = window.location.href.split("/").slice(-1)[0];
      console.log(slug);
      const item = courseData.find((item) => item.key === slug);
      setCourseDetails(item);
    }
  }, [courseData]);

  console.log(courseData);

  return (
    <div className="pt-32 max-w-2xl mx-auto p-5 pb-28">
      <h2 className="text-center text-4xl underline mb-12">
        {courseDetails?.title}
      </h2>

      <img src={courseDetails?.img} alt="" />
      <p className="text-xl font-bold mt-8">Details:</p>
      <p
        className="text-lg -mt-3"
        dangerouslySetInnerHTML={{ __html: courseDetails?.details }}
      />

      <p className="text-xl font-bold mt-8">Opportunity: </p>
      <p className="text-lg">{courseDetails?.additional}</p>
    </div>
  );
};

export default CourseDetails;
