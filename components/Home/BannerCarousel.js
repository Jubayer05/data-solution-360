import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { motion } from "framer-motion";
import {
  AiFillEnvironment,
  AiFillGift,
  AiFillHome,
  AiFillNotification,
} from "react-icons/ai";
import { BiAlarmAdd, BiArch, BiBookHeart } from "react-icons/bi";
import { DiPython } from "react-icons/di";
import { SiPowerbi } from "react-icons/si";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { EffectFade, Autoplay, Pagination, Navigation } from "swiper";

const BannerCarousel = () => {
  const motionData = [
    {
      id: "1",
      title: "This is first point 1",
      icon: <AiFillHome />,
      transitionDelay: 1.2,
    },
    {
      id: "2",
      title: "This is first point 2",
      icon: <AiFillEnvironment />,
      transitionDelay: 2,
    },
    {
      id: "3",
      title: "This is first point 3",
      icon: <AiFillGift />,
      transitionDelay: 2.8,
    },
    {
      id: "4",
      title: "This is first point 4",
      icon: <AiFillNotification />,
      transitionDelay: 3.6,
    },
    {
      id: "5",
      title: "This is first point 5",
      icon: <BiAlarmAdd />,
      transitionDelay: 4.4,
    },
    // {
    //   id: "6",
    //   title: "This is first point 6",
    //   icon: <BiArch />,
    //   transitionDelay: 5.2,
    // },
    // {
    //   id: "7",
    //   title: "This is first point 7",
    //   icon: <BiBookHeart />,
    //   transitionDelay: 6,
    // },
  ];

  const slideTwoMotionData = [
    {
      id: "1",
      title: "Python",
      icon: <DiPython />,
      bg: "#4b8bbe",
      transitionDelay: 2,
    },
    {
      id: "2",
      title: "Power BI",
      icon: <SiPowerbi />,
      bg: "goldenrod",
      transitionDelay: 3.2,
    },
  ];

  return (
    <div className="pt-16">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        effect={"fade"}
        speed={1000}
        autoplay={{
          delay: 650000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* NOTE: first slide */}
        <SwiperSlide>
          {({ isActive }) => (
            <div
              // className="min-h-screen bg-center bg-cover"
              className="bg-center bg-cover"
              style={{
                backgroundImage: "url(/banner/img8.jpg)",
                minHeight: "calc(100vh - 60px)",
              }}
            >
              <div
                className="pt-32"
                style={{
                  backgroundColor: "rgba(255,255,255,0.4)",
                  minHeight: "calc(100vh - 60px)",
                }}
              >
                <div className="flex items-center max-w-6xl mx-auto">
                  {isActive && (
                    <div className="overflow-hidden sm:w-full md:w-3/5 lg:w-2/5 sm:ml-0 md:ml-8 lg:ml-20 px-8">
                      {/* NOTE: HEADER */}
                      <motion.h2
                        key="head"
                        className="mt-1 text-xl uppercase font-semibold"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2,
                        }}
                      >
                        Welcome to Bangladeshi Data Science Learning Platform at
                        Data Solution-360
                      </motion.h2>
                      <div className="w-14 flex justify-center mt-2 mb-8">
                        <motion.h2
                          key="head-line"
                          className="mt-1 w-9 h-1 bg-sky-500"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1.49 }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                          }}
                        />
                      </div>
                      {/* NOTE: LISTS */}
                      {motionData.map((item) => (
                        <motion.h2
                          key={item.id}
                          className="text-sm text-gray-800 mt-3 flex"
                          initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: item.transitionDelay,
                          }}
                        >
                          <span className="ml-16 sm:ml-0">{item.icon}</span>
                          <span className="ml-3">{item.title}</span>
                        </motion.h2>
                      ))}

                      <div className="mt-10 pb-8 flex items-center ">
                        <motion.img
                          src="/logo/logo.png"
                          key="head-line"
                          className="ml-6 w-36"
                          initial={{ y: 50, rotateY: 180, opacity: 0 }}
                          animate={{ y: 0, rotateY: 360, opacity: 1 }}
                          transition={{
                            duration: 1,
                            delay: 5.2,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>

        {/* NOTE: second slide */}
        <SwiperSlide>
          {({ isActive }) => (
            <div
              className=" bg-center bg-cover"
              style={{
                backgroundImage: "url(/banner/img4.jpg)",
                minHeight: "calc(100vh - 60px)",
              }}
            >
              <div
                className="pt-32 "
                style={{
                  backgroundColor: "rgba(255,255,255,0.4)",
                  minHeight: "calc(100vh - 60px)",
                }}
              >
                <div className="max-w-6xl mx-auto flex items-center justify-end sm:mr-0 md:mr-8 lg:mr-32">
                  {isActive && (
                    <div className="mt-10 overflow-hidden sm:w-full md:w-3/5 lg:w-2/5 px-8">
                      {/* NOTE: HEADER */}
                      <motion.h2
                        key="head"
                        className="mt-1 text-xl uppercase font-semibold"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.2,
                        }}
                      >
                        Welcome to the most elegant online data science course
                      </motion.h2>
                      <div className="w-14 flex justify-center mt-2 mb-8">
                        <motion.h2
                          key="head-line"
                          className="mt-1 w-9 h-1 bg-green-700"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1.49 }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                          }}
                        />
                      </div>
                      <motion.h2
                        key="choice"
                        className="mt-1 mb-4 font-semibold"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 1,
                        }}
                      >
                        Learn any course of your choice on-line
                      </motion.h2>
                      {/* NOTE: LISTS */}
                      <div className="flex items-center">
                        {slideTwoMotionData.map((item) => (
                          <motion.h2
                            key={item.id}
                            className="text-white mt-3 flex mr-8 relative"
                            initial={{ y: 40, rotateY: 180, opacity: 0 }}
                            animate={{ y: 0, rotateY: 360, opacity: 1 }}
                            transition={{
                              duration: 0.4,
                              delay: item.transitionDelay,
                            }}
                          >
                            <span
                              className="text-4xl p-5 rounded-full"
                              style={{ backgroundColor: item.bg }}
                            >
                              {item.icon}
                            </span>
                            <span className="w-24 absolute top-16 uppercase  text-black">
                              {item.title}
                            </span>
                          </motion.h2>
                        ))}
                      </div>

                      <div className="mt-10 pb-8 flex items-center ">
                        <motion.button
                          key="head-line"
                          className="py-2 px-4 border-x border-y rounded-md border-black hover:bg-green-900 hover:border-transparent hover:text-white transition-all duration-200"
                          initial={{ y: 50, rotateY: 180, opacity: 0 }}
                          animate={{ y: 0, rotateY: 360, opacity: 1 }}
                          transition={{
                            duration: 1,
                            delay: 4.5,
                          }}
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>

        {/* NOTE: third slide */}
        <SwiperSlide>
          {({ isActive }) => (
            <div
              className=" bg-center bg-cover"
              style={{
                backgroundImage: "url(/banner/img9.jpg)",
                minHeight: "calc(100vh - 60px)",
              }}
            >
              <div
                className="pt-32 "
                style={{
                  backgroundColor: "rgba(255,255,255,0.4)",
                  minHeight: "calc(100vh - 60px)",
                }}
              >
                <div className="max-w-6xl mx-auto flex items-center sm:ml-0 md:ml-8 lg:ml-20 ">
                  {isActive && (
                    <div className="mt-10 overflow-hidden sm:w-full md:w-3/5 lg:w-2/5 px-8">
                      {/* NOTE: HEADER */}
                      <motion.h2
                        key="head"
                        className="mt-1 text-xl uppercase font-semibold"
                        initial={{ scale: 0.65, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.4,
                        }}
                      >
                        Welcome to the most elegant online data science course
                      </motion.h2>
                      <div className="w-14 flex justify-center mt-2 mb-8">
                        <motion.h2
                          key="head-line"
                          className="mt-1 w-9 h-1 bg-yellow-600"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1.49 }}
                          transition={{
                            duration: 1,
                            delay: 0.2,
                          }}
                        />
                      </div>
                      <motion.h2
                        key="choice"
                        className="mt-1 mb-4 font-semibold"
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 1.5,
                        }}
                      >
                        Get certificate after successful finished course
                      </motion.h2>
                      {/* NOTE: LISTS */}
                      <div className="flex items-center">
                        <motion.h2
                          key="text"
                          className="mt-3 flex sm:mr-0 md:mr-8 relative"
                          initial={{ x: -140, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: 2.5,
                          }}
                        >
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Voluptas illum maxime soluta labore architecto
                          facilis, ad laborum molestiae magnam sit impedit et!
                          Delectus voluptatibus reprehenderit blanditiis ea
                          exercitationem facere tempore?
                        </motion.h2>
                      </div>

                      <div className="mt-10 pb-8 flex items-center ">
                        <motion.button
                          key="head-line"
                          className="py-2 px-4 border-x border-y rounded-md border-black hover:bg-green-900 hover:border-transparent hover:text-white transition-all duration-200"
                          initial={{ y: 50, rotateY: 180, opacity: 0 }}
                          animate={{ y: 0, rotateY: 360, opacity: 1 }}
                          transition={{
                            duration: 0.7,
                            delay: 3.2,
                          }}
                        >
                          Learn More
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
