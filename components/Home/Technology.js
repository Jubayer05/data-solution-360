import { message } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import firebase from '../../firebase';
import { useStateContext } from '../../src/context/ContextProvider';

const Technology = () => {
  const { userEmail } = useStateContext();
  const [technologyStack, setTechnologyStack] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const doc = await firebase
          .firestore()
          .collection('utility_collection')
          .doc('technology_stack')
          .get();

        if (doc.exists) {
          const data = doc.data();
          setTechnologyStack(data.technology || []);
        }
      } catch (error) {
        message.error('Failed to load technology');
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="bg-[#f9f9fa]	py-4 md:pt-20 px-3" id="courses">
      <div
        className="max-w-6xl relative mx-auto rounded-lg shadow bg-cover bg-center overflow-hidden bg-white
        "
      >
        <div className="">
          <div className="py-4 md:py-8 z-50">
            <h2 className="text-center text-3xl font-bold font-heading mt-4 text-black">
              Technology Stack
            </h2>
            <div className="w-36 h-1.5 bg-gradient-to-r from-orange-600 to-blue-700 rounded-full mx-auto"></div>
            <div className="mt-6 text-sm md:text-xl sm:w-2/3 mx-auto text-justify md:text-center  px-4 text-black">
              <p>
                The field of data science has evolved to a stage where no
                organization can ignore it while setting up their data science
                tech stack.
              </p>
            </div>

            <div className="mt-8 max-w-5xl mx-auto">
              <Marquee speed={30} className="pb-8 pt-4">
                {technologyStack?.map((item) => (
                  <div
                    key={item.key}
                    className="bg-white shadow w-24 h-24 md:w-28 md:h-28 flex items-center 
              justify-center flex-col rounded-lg overflow-hidden mx-3 md:mx-6"
                  >
                    <Image
                      width={500}
                      height={300}
                      src={item.img}
                      alt=""
                      className="w-12 md:w-20"
                    />
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
                    <Image
                      width={500}
                      height={300}
                      src={item.img}
                      alt=""
                      className="w-12 md:w-20"
                    />
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
