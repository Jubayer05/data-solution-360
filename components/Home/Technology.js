/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Marquee from 'react-fast-marquee';
import { useStateContext } from '../../src/context/ContextProvider';

const Technology = () => {
  const { userEmail, technologyStack } = useStateContext();
  return (
    <div className="bg-[#f9f9fa]	py-4 md:pt-20 px-3" id="courses">
      <div
        style={{ backgroundImage: "url('/Background/bg-2.jpg')" }}
        className="max-w-6xl relative mx-auto rounded-lg shadow bg-cover bg-center overflow-hidden"
      >
        <div className="w-full h-full bg-black opacity-70 absolute" />
        <div className="flex">
          <div className="py-4 md:py-8 z-50">
            <h2 className="text-center text-3xl font-bold font-heading mt-4 text-white">
              Technology Stack
            </h2>
            <div className="w-36 h-1.5 bg-gradient-to-r from-orange-600 to-blue-700 rounded-full mx-auto"></div>
            <p className="text-center mt-6 text-sm md:text-xl sm:w-2/3 mx-auto px-4 text-white">
              The field of data science has evolved to a stage where no
              organization can ignore it while setting up their data science
              tech stack.
            </p>

            <div className="mt-8 max-w-5xl mx-auto">
              <Marquee speed={30} className="pb-8 pt-4">
                {technologyStack?.map((item) => (
                  <div
                    key={item.key}
                    className="bg-white shadow w-24 h-24 md:w-28 md:h-28 flex items-center 
              justify-center flex-col rounded-lg overflow-hidden mx-3 md:mx-6"
                  >
                    <img src={item.img} alt="" className="w-12 md:w-20" />
                    <p className="m-0 text-sm md:text-base text-center leading-4 ">
                      {item?.titleIcon}
                    </p>
                  </div>
                ))}
              </Marquee>

              <Marquee direction="right" speed={30} className="pt-8 pb-4">
                {technologyStack?.map((item) => (
                  <div
                    key={item.key}
                    className="bg-white shadow-md w-24 h-24 md:w-28 md:h-28 flex items-center 
                justify-center flex-col rounded-lg overflow-hidden mx-3 md:mx-6"
                  >
                    <img src={item.img} alt="" className="w-12 md:w-20" />
                    <p className="m-0 text-sm md:text-base text-center leading-4 ">
                      {item?.titleIcon}
                    </p>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;
