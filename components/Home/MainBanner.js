import React from "react";
import * as animationData from "../../src/data/json/data-analysis.json";
import Lottie from "react-lottie";

const MainBanner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div
      className="pt-16 text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(38, 52, 110), rgb(40, 52, 113))",
      }}
    >
      <div
        className="max-w-6xl mx-auto flex justify-between items-center"
        style={{
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div className="flex-1">
          <h2 className="text-white text-5xl font-heading">
            Learn Data science earn money and lead the world of technology
          </h2>
          <p className="text-lg">
            Bangladeshi number one data science learning platform.
          </p>
          <button className="text-base px-4 py-3 border-2 rounded-lg border-transparent bg-primary-bg transition-all duration-300 ease-linear hover:bg-white hover:text-primary hover:border-primary">
            Explore Courses
          </button>
        </div>
        <div className="flex-1 overflow-visible">
          <Lottie options={defaultOptions} width={580} />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
