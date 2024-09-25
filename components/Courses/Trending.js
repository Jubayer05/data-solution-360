import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import { useStateContext } from '../../src/context/ContextProvider';

const Trending = () => {
  const { trendingCourse } = useStateContext();

  // const findTrendingCourse = trendingCourse.find(
  //   (item) => item.key === 'vMVpfcjol5dGUyiVZDDO',
  // );

  const settings = {
    // dots: true,
    pauseOnHover: false,
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


  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h2 className="text-center text-3xl font-bold font-heading mt-16 text-headerMain">
        Trending Course
      </h2>
      <Slider {...settings}>
        {trendingCourse?.map((item) => (
          <div
            key={item.id}
            className="p-3 md:p-6 w-full 
              flex-col lg:flex-row gap-4 rounded-2xl overflow-hidden"
            // style={{
            //   minHeight: '100vh',
            // }}
          >
            <Image
              width={500}
              height={300}
              className="w-full rounded-lg shadow-lg"
              src={item?.photoUrl}
              alt="trending course"
            />
            <div className="flex justify-center mt-10">
              <Link href={item?.trendingCourseLink || '#'}>
                <button
                  className={`text-md px-3 py-2 hover:drop-shadow-xl flex items-center text-white rounded-md mt-2
          bg-[#d6295f] transition-all duration-300 ease-linear `}
                >
                  Click Here for Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Trending;
