import React from "react";
import People from "./People";

const Career = () => {
  return (
    <div className="pt-20 max-w-6xl mx-auto">
      <h2 className="text-center text-4xl font-bold font-heading mt-16 text-headerMain">
        Career at Data solution 360
      </h2>

      <h2 className="text-center text-2xl font-bold font-heading mt-16 mb-12 text-[#2c7f88]">
        Our Internship Programs
      </h2>
      <People />
    </div>
  );
};

export default Career;
