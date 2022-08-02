/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as animationData from "../../src/data/json/data-analysis.json";
import { RiDoubleQuotesR, RiDoubleQuotesL } from "react-icons/ri";
import Lottie from "react-lottie";
import { useStateContext } from "../../src/context/ContextProvider";
import { slidesData } from "../../src/data/data";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const { language } = useStateContext();

  return (
    <div className="h-screen pb-1" style={{ backgroundColor: "#fae7df" }}>
      <h1
        className="text-4xl sm:text-5xl text-center leading-normal pt-36 pb-6 "
        style={{ color: "#777" }}
      >
        {language === "English"
          ? "Welcome to Data solution-360!"
          : "ডাটা সল্যুশন-৩৬০ এ আপনাকে স্বাগতম।"}
      </h1>
      <p className="text-center text-black flex items-start justify-center">
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
      <div className="mt-24 max-w-4xl mx-auto pb-10">
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {slidesData.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center justify-center"
            >
              <div className="flex items-center justify-center w-full h-64 rounded-lg  bg-transparent">
                <img
                  src={item.img}
                  className="h-full overflow-hidden rounded-lg"
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
