import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const BannerCompanies = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const companyLogos = [
    { id: '1', img: '/bannerCompany/1.png', name: 'Tech Innovators' },
    { id: '2', img: '/bannerCompany/2.png', name: 'Global Solutions' },
    { id: '3', img: '/bannerCompany/3.png', name: 'Digital Frontier' },
    { id: '4', img: '/bannerCompany/1.png', name: 'Future Systems' },
    { id: '5', img: '/bannerCompany/2.png', name: 'Quantum Dynamics' },
    { id: '6', img: '/bannerCompany/3.png', name: 'Innovative Nexus' },
  ];

  return (
    <section className="bg-[#0a192f] py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
            Empowering Global Innovators
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Trusted by forward-thinking companies driving technological
            transformation
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a192f] to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a192f] to-transparent z-10"></div>
          <Slider {...settings}>
            {companyLogos.map((item) => (
              <div key={item.id} className="px-4 focus:outline-none group">
                <div className="bg-[#112240] rounded-2xl p-6 flex justify-center items-center h-36 border border-gray-800 transition-all duration-300 group-hover:border-cyan-500 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                  <Image
                    width={180}
                    height={100}
                    src={item.img}
                    alt={`${item.name} logo`}
                    className="max-h-20 max-w-full object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BannerCompanies;
