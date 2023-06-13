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
    <div>
      <h2 className="text-3xl text-center mt-12 mb-8">Meet our team</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 lg:gap-16 pb-20 px-3 ">
        {teamMembers.map((item) => (
          <div
            key={item.name}
            className="w-full overflow-hidden rounded-md shadow-lg"
          >
            <img
              className="h-[320px] w-full transition-all 0.2s hover:scale-105"
              src={item.img}
              alt=""
            />
            <div className="px-5 py-8">
              <p className="text-base text-gray-900 font-semibold mt-2">
                {item.name}
              </p>
              <p className="text-xs text-gray-600 -mt-3">{item.profession}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
