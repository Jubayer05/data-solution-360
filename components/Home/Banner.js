import React from "react";
import * as animationData from "../../data/json/data-analysis.json";
import Lottie from "react-lottie";

const Banner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="bg-hero-pattern bg-center bg-cover">
      <h1
        className="text-5xl text-center leading-normal pt-20"
        style={{ color: "#01052e" }}
      >
        Welcome to best data science <br /> course at{" "}
        <span className="text-gray-500"> Data Solution 360</span>
      </h1>
      <div className="mt-10">
        <Lottie options={defaultOptions} height="100%" width="500px" />
      </div>
    </div>
  );
};

export default Banner;
