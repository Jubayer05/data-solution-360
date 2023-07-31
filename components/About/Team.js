/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Nazmus Sakib',
      profession: 'Founder and CEO at Data Solution 360',
      img: '/team/sakib.jpg',
    },
    {
      name: 'Shaikh Farhad Hossain, PhD',
      profession: 'Trainer and Advisor Data Scientist and AI Researcher',
      img: '/team/Shamim.jpg',
    },
  ];

  return (
    <div className="bg-[#f9f9fa] pt-10 pb-6 mt-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl text-center font-heading my-8">
          Meet our team
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 pb-20 px-3 ">
          {teamMembers.map((item) => (
            <div
              key={item.name}
              className="w-full overflow-hidden rounded-md shadow-lg cursor-pointer group"
            >
              <img
                className="h-[240px] w-full transition-all 0.2s group-hover:scale-105"
                src={item.img}
                alt=""
              />
              <div className="p-5">
                <p className="text-gray-900 font-heading font-semibold mt-2 text-xl">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600 -mt-3">{item.profession}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
