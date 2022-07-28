import React from "react";
import * as animationData from "../../src/data/json/data-analysis.json";
import { RiDoubleQuotesR, RiDoubleQuotesL } from "react-icons/ri";
import Lottie from "react-lottie";
import { useStateContext } from "../../src/context/ContextProvider";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "swiper/swiper.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/components/navigation/navigation.min.css";

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

  const slides = [
    { id: "Slide 1" },
    { id: "Slide 2" },
    { id: "Slide 3" },
    { id: "Slide 4" },
    { id: "Slide 5" },
    { id: "Slide 6" },
    { id: "Slide 7" },
    { id: "Slide 8" },
  ];

  return (
    <div className="" style={{ backgroundColor: "#1a161f" }}>
      <h1
        className="text-4xl sm:text-5xl text-center leading-normal pt-36 pb-6 "
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
            Only a perfect guide can make a good data scientist.
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
      <div className="mt-28 max-w-4xl mx-auto pb-10">
        <Swiper
          spaceBetween={30}
          slidesPerView={5}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {slides.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-center"
            >
              <div className="flex items-center justify-center w-full h-56 px-4 py-5 rounded-lg  bg-white">
                {item.id}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
