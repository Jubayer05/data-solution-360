/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useStateContext } from "../../src/context/ContextProvider";
import { services } from "../../src/data/data";

const Service = () => {
  const { language } = useStateContext();

  return (
    <div className="max-w-6xl py-10 mx-auto">
      <h2 className="text-center text-4xl font-bold mt-16 mb-6">
        {language === "English" ? (
          "Our Services"
        ) : (
          <span className="font-bangla">আমাদের সেবাসমূহ</span>
        )}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
        {services.map((item) => (
          <ServiceItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Service;

const ServiceItem = ({ item }) => {
  return (
    <div className="overflow-hidden text-center p-5 shadow-lg w-3/4 sm:w-full mx-auto  rounded-lg">
      <img src={item.img} alt="" className="w-20 h-20 mx-auto " />
      <h2 className="text-xl font-bold text-center mt-6 mb-3">{item.title}</h2>
      <p className="text-lg text-gray-500">{item.details}</p>
    </div>
  );
};
