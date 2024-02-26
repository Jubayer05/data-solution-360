/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useStateContext } from '../../src/context/ContextProvider';
import { services } from '../../src/data/data';

const Service = () => {
  const { language } = useStateContext();

  return (
    <div className="bg-[#ffffff] font-bangla px-3">
      <div className="max-w-6xl py-10 md:pb-32 px-2 mx-auto">
        <h2 className="text-center text-[26px] md:text-[36px] font-bold font-heading mt-16 text-headerMain mb-2">
          {language === 'English' ? (
            'Live Course Content'
          ) : (
            <span className="font-bangla">
              ডেটা সলিউশন - 360 এর ফিচারগুলো দেখুন
            </span>
          )}
        </h2>
        <p className="text-center font-bold text-xl font-subHeading mb-8 text-[#667087]	">
          See what you are getting after joining our live courses
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
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
    <div
      className="overflow-hidden text-center p-1.5 md:p-4 pt-2 md:pt-8  
     rounded-lg border border-[#98a2b3] w-full mx-auto"
    >
      <img src={item.img} alt="" className="w-20 h-20 mx-auto " />
      <h2 className="text-xl font-bold text-center mt-6 mb-3 capitalize">
        {item.title}
      </h2>
      <p className="text-base tracking-[.32px] text-[rgb(29, 41, 57)]">
        {item.details}
      </p>
    </div>
  );
};
