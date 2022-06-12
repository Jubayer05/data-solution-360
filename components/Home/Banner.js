import React from "react";
import * as animationData from "../../data/json/data-analysis.json";
import { RiDoubleQuotesR, RiDoubleQuotesL } from "react-icons/ri";
import Lottie from "react-lottie";
import { useStateContext } from "../../context/contextProvider";

const Banner = () => {
  const { language } = useStateContext();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="" style={{ backgroundColor: "#1a161f" }}>
      <h1
        className="text-5xl text-center leading-normal pt-36 pb-6 "
        style={{ color: "#ddd" }}
      >
        {language === "English"
          ? "Welcome to Data solution-360!"
          : "ডাটা সল্যুশন-৩৬০ এ আপনাকে স্বাগতম।"}
        {/* <span className="text-gray-500"> Data Solution 360</span> */}
      </h1>
      <p className="text-center text-white flex items-start justify-center">
        {language === "English" ? (
          <>
            <RiDoubleQuotesL />
            Only a perfect guide can make a good data scientist
            <RiDoubleQuotesR />
          </>
        ) : (
          <>
            <RiDoubleQuotesL />
            একটি পরিপূর্ণ দিক নির্দেশনাই পারবে একজন ভালো ডাটা সায়েন্টিস্ট বানাতে
            <RiDoubleQuotesR />
          </>
        )}
      </p>
      <div className="mt-10">
        <Lottie options={defaultOptions} height="100%" width="500px" />
      </div>
    </div>
  );
};

export default Banner;

// NOTE: THIS IS FOR SHIKKHAGHAR
// const Banner = () => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   return (
//     <div className="bg-hero-pattern bg-center bg-cover">
//       <h1
//         className="text-5xl text-center leading-normal pt-20"
//         style={{ color: "#01052e" }}
//       >
//         Welcome to best data science <br /> course at{" "}
//         <span className="text-gray-500"> Data Solution 360</span>
//       </h1>
//       <div className="mt-10">
//         <Lottie options={defaultOptions} height="100%" width="500px" />
//       </div>
//     </div>
//   );
// };

// export default Banner;
