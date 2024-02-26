/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import Lottie from 'react-lottie';
import Slider from 'react-slick';
import * as animationData from '../../public/banner/loader.json';

const MainBanner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const settings = {
    // dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    slidesToShow: 1,
    slidesToScroll: 1,
    // responsive: [
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 560,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };

  const bannerSlideData = [
    {
      id: '1',
      img: '/banner/slide_1.jpeg',
    },
    {
      id: '2',
      img: '/banner/slide_2.jpeg',
    },
    {
      id: '3',
      img: '/banner/slide_3.jpeg',
    },
  ];

  return (
    <div className="bg-[#f9f9fa] pt-36 pb-10 px-3 -mt-20">
      {/* <div className="relative w-full h-full"></div> */}
      <div className="relative max-w-6xl mx-auto border border-[#a2aabb] md:px-6 gap-4 rounded-2xl overflow-hidden">
        <div
          className="absolute h-[200px] w-[200px] top-[-100px] left-[-100px]
        rounded-full bg-[#12b76a] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] bottom-[-100px] left-[-100px]
        rounded-full bg-[#12b76a] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] top-[-200px] left-[45%]
        rounded-full bg-[#12b76a] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] bottom-[-200px] left-[45%]
        rounded-full bg-[#4478ff] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] top-[-100px] right-[-100px]
        rounded-full bg-[#4478ff] filter blur-[100px]"
        />
        <div
          className="absolute h-[200px] w-[200px] bottom-[-100px] right-[-100px]
        rounded-full bg-[#12b76a] filter blur-[100px]"
        />
        <div className="absolute w-full h-full bg-white opacity-60 left-0" />
        <Slider {...settings}>
          {bannerSlideData?.map((item) => (
            <div
              key={item.id}
              className="p-3 md:p-6 w-full 
              flex-col lg:flex-row gap-4 rounded-2xl overflow-hidden"
              // style={{
              //   minHeight: '100vh',
              // }}
            >
              <div className="flex justify-between items-center py-6 flex-col gap-5 md:flex-row">
                <div className="flex-1 z-10">
                  <h2
                    className="text-headerMain text-[28px] md:text-[45px] leading-[1.3] 
                  font-heading tracking-wide md:mt-10 font-bold mb-0"
                  >
                    Bangladesh Data Science Learns{' '}
                    <span className="text-[#e83a30] relative">
                      Live
                      <span className="w-[50px] absolute -right-16 top-[15%]">
                        <Lottie options={defaultOptions} />
                      </span>
                    </span>
                  </h2>
                  <p className="text-lg text-headerSub my-4 font-semibold">
                    Best Data Science learning Platform in Bangladesh
                  </p>
                  <Link href="/courses">
                    <button
                      className="text-sm md:text-base font-semibold text-white px-4 py-2 border-2 rounded-lg border-transparent bg-primary-bg 
                    transition-all duration-300 ease-linear hover:bg-white hover:text-primary 
                    hover:border-primary"
                    >
                      Explore Courses
                    </button>
                  </Link>
                </div>
                <div className="flex-1 overflow-visible z-10">
                  <img
                    className="w-[500px] rounded-2xl ml-auto"
                    src={item.img}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MainBanner;
