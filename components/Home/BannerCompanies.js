/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Slider from 'react-slick';

const BannerCompanies = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const companyLogos = [
    {
      id: '1',
      img: '/bannerCompany/1.png',
    },
    {
      id: '2',
      img: '/bannerCompany/2.png',
    },
    {
      id: '3',
      img: '/bannerCompany/3.png',
    },
    {
      id: '4',
      img: '/bannerCompany/1.png',
    },
    {
      id: '5',
      img: '/bannerCompany/2.png',
    },
    {
      id: '6',
      img: '/bannerCompany/3.png',
    },
  ];

  return (
    <div
      className="text-white"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgb(38, 52, 110), rgb(40, 52, 113))',
      }}
    >
      <div className="max-w-6xl mx-auto p-4 pb-16">
        <h2 className="text-white text-lg pb-5">
          These 50 companies are looking for you
        </h2>
        <Slider {...settings}>
          {companyLogos.map((item) => (
            <div key={item.id}>
              <img
                className="w-[70px] h-[35px] sm:w-[85px] sm:h-[45px] md:w-[100px] md:h-[55px]"
                src={item.img}
                alt=""
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerCompanies;
