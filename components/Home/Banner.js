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
import BannerCarousel from "./BannerCarousel";

const Banner = () => {
  const { language } = useStateContext();

  return (
    <div className="">
      <BannerCarousel />
    </div>
  );
};

export default Banner;
