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
      className=" text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(38, 52, 110), rgb(40, 52, 113))",
      }}
    >
      <div
        className="max-w-6xl mx-auto p-4 flex justify-between items-center flex-col lg:flex-row"
        style={{
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <div className="flex-1">
          <h2 className="text-white text-5xl font-heading">
            Learn Data science earn money and lead the world of technology
          </h2>
          <p className="text-lg">
            Best Data Science learning Platform in Bangladesh
          </p>
          <button
            className="text-base px-4 py-3 border-2 rounded-lg border-transparent bg-primary-bg 
                      transition-all duration-300 ease-linear hover:bg-white hover:text-primary 
                    hover:border-primary"
          >
            Explore Courses
          </button>
        </div>
        <div className="flex-1 overflow-visible w-[350px] md:w-[500px]">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
