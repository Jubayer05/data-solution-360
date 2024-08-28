import React from 'react';
import { useStateContext } from '../../src/context/ContextProvider';
import Image from 'next/image';

const GameChanger = () => {
  const { userEmail, technologyStack } = useStateContext();
  return (
    <div className="bg-[#f9f9fa]	py-4 md:pt-20 px-3" id="courses">
      <div
        style={{ backgroundImage: "url('/Background/bg-1.jpg')" }}
        className="max-w-6xl relative mx-auto rounded-lg shadow bg-cover bg-center overflow-hidden
        "
      >
        {/* <div className="w-full h-full bg-black opacity-70 absolute" /> */}
        <div className="bg-[rgba(0,0,0,0.51)]">
          <div className="py-4 md:py-8 z-50">
            <h2 className="text-center text-3xl font-bold font-heading mt-4 text-white">
              The Game Changer
            </h2>
            <div className="w-36 h-1.5 bg-gradient-to-r from-orange-600 to-blue-700 rounded-full mx-auto"></div>
            <div className="mt-6 text-sm md:text-xl sm:w-3/4 mx-auto text-justify md:text-center  px-4 text-white">
              <p>
                Data Solutions 360&apos;s innovative data science program equips
                learners with essential skills, transforming careers and driving
                success in the competitive tech industry. It&apos;s truly the
                game changer in education.
              </p>
            </div>

            <div>
              <div className="container mx-auto h-[500px] rounded-[50px] overflow-y-scroll scrollbar-hide">
                <ul id="cards" className="rounded-[50px]">
                  <li className="card sticky top-0" id="card1">
                    <div
                      id="card1"
                      className="card card-body bg-lime-600 flex justify-center rounded-xl overflow-hidden"
                    >
                      <div className="w-[65%] px-10 py-5">
                        <h3 className="leading-[1.5] uppercase text-base text-left font-bold font-heading">
                          Zero to Career
                        </h3>
                        <h2
                          className="leading-[1.5] uppercase text-[48px] text-left font-bold 
                  font-heading mt-8 mb-5"
                        >
                          Zero to Career
                        </h2>
                        <p className="leading-[1.7] text-2xl text-justify font-heading font-[400]">
                          You will get everything from the beginning of your
                          journey until you get an internship or a full-time
                          job.
                        </p>
                      </div>
                      <div className="bg-white w-[35%] h-full flex justify-center items-center">
                        <Image
                          width={500}
                          height={300}
                          src="/icon/medal.png"
                          className="w-[120px] animate-pulse"
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                  <li className="card" id="card2">
                    <div
                      id="card1"
                      className="card card-body bg-pink-600 flex justify-center rounded-xl overflow-hidden"
                    >
                      <div className="w-[65%] px-10 py-5">
                        <h3 className="leading-[1.5] uppercase text-base text-left font-bold font-heading">
                          Hello DS - 360
                        </h3>
                        <h2
                          className="leading-[1.5] uppercase text-[48px] text-left font-bold 
                  font-heading mt-8 mb-5"
                        >
                          Hello DS - 360
                        </h2>
                        <p className="leading-[1.7] text-2xl text-justify font-heading font-[400]">
                          You will get everything from the beginning of your
                          journey until you get an internship or a full-time
                          job.
                        </p>
                      </div>
                      <div className="bg-white w-[35%] h-full flex justify-center items-center">
                        <Image
                          width={500}
                          height={300}
                          src="/icon/medal.png"
                          className="w-[120px] animate-pulse"
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                  <li className="card" id="card3">
                    <div
                      id="card2"
                      className="card card-body  bg-blue-600 flex justify-center rounded-xl overflow-hidden"
                    >
                      <div className="w-[65%] px-10 py-5">
                        <h3 className="leading-[1.5] uppercase text-base text-left font-bold font-heading">
                          Zero to Career
                        </h3>
                        <h2
                          className="leading-[1.5] uppercase text-[48px] text-left font-bold 
                  font-heading mt-8 mb-5"
                        >
                          Zero to Career
                        </h2>
                        <p className="leading-[1.7] text-2xl text-justify font-heading font-[400]">
                          You will get everything from the beginning of your
                          journey until you get an internship or a full-time
                          job.
                        </p>
                      </div>
                      <div className="bg-white w-[35%] h-full flex justify-center items-center">
                        <Image
                          width={500}
                          height={300}
                          src="/icon/medal.png"
                          className="w-[120px] animate-pulse"
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                  <li className="card" id="card4">
                    <div
                      id="card4"
                      className="card card-body bg-yellow-600 flex justify-center rounded-xl overflow-hidden"
                    >
                      <div className="w-[65%] px-10 py-5">
                        <h3 className="leading-[1.5] uppercase text-base text-left font-bold font-heading">
                          Welcome to Data Solution 360
                        </h3>
                        <h2
                          className="leading-[1.5] uppercase text-[48px] text-left font-bold 
                  font-heading mt-8 mb-5"
                        >
                          Welcome to Data Solution 360
                        </h2>
                        <p className="leading-[1.7] text-2xl text-justify font-heading font-[400]">
                          You will get everything from the beginning of your
                          journey until you get an internship or a full-time
                          job.
                        </p>
                      </div>
                      <div className="bg-white w-[35%] h-full flex justify-center items-center">
                        <Image
                          width={500}
                          height={300}
                          src="/icon/medal.png"
                          className="w-[120px] animate-pulse"
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameChanger;
