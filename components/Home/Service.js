/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useStateContext } from '../../src/context/ContextProvider';
import { services } from '../../src/data/data';

const Service = () => {
  const { language } = useStateContext();

  return (
    <div className="bg-[#edf2f5]">
      <div className="max-w-6xl py-10 px-2 mx-auto font-body">
        <h2 className="text-center text-[26px] md:text-3xl font-bold font-heading mt-16 text-headerMain	">
          {language === 'English' ? (
            'See the feature of Data Solution - 360'
          ) : (
            <span className="font-bangla">
              ডেটা সলিউশন - 360 এর ফিচারগুলো দেখুন
            </span>
          )}
        </h2>
        <p className="text-center font-bold font-subHeading mb-16 text-headerMain	">
          During the course Data Solution - 360 provides all of this features
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 md:gap-x-6 gap-y-4 md:gap-y-6">
          {services.map((item) => (
            <ServiceItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;

const ServiceItem = ({ item }) => {
  return (
    <div className="overflow-hidden text-center px-1.5 md:px-5 pt-2 md:pt-10 pb-2 md:pb-16 shadow-lg rounded-lg bg-white sm:w-full mx-auto hover:-translate-y-3 hover:shadow-xl transition-translate duration-300">
      <img src={item.img} alt="" className="w-20 h-20 mx-auto " />
      <h2 className="text-xl font-bold text-center mt-6 mb-3">{item.title}</h2>
      <p className="text-sm text-gray-500">{item.details}</p>
    </div>
  );
};
