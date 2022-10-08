/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useStateContext } from "../../src/context/ContextProvider";
import { MainBanner } from "../index";

const Banner = () => {
  const { language } = useStateContext();

  return (
    <div className="">
      {/* <BannerCarousel /> */}
      <MainBanner />
    </div>
  );
};

export default Banner;
