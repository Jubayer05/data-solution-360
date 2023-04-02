/* eslint-disable @next/next/no-img-element */
import React from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "Nazmus Sakib",
      profession: "Founder and CEO at Data Solution 360",
      img: "/team/sakib.jpg",
    },
    {
      name: "Shaikh Farhad Hossain, PhD",
      profession: "Trainer and Advisor Data Scientist and AI Researcher",
      img: "/team/Shamim.jpg",
    },
    {
      name: "Ashraful Alam",
      profession: "Junior Executive",
      img: "/team/ashraful.jpg",
    },
    {
      name: "Shamim Ahmed ",
      profession: "Graphics Designer and Video Editor",
      img: "/team/Farhad.png",
    },
    {
      name: "Jubayer Ahmed",
      profession: "Web Developer",
      img: "/team/jubayer.jpeg",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl text-center mt-12 mb-8">Meet our team</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-7 pb-20 px-3 ">
        {teamMembers.map((item) => (
          <div key={item.name} className="w-full">
            <img
              className="h-60 w-full transition-all 0.2s hover:scale-105 rounded-md"
              src={item.img}
              alt=""
            />
            <p className="text-base text-gray-900 font-semibold mt-2">
              {item.name}
            </p>
            <p className="text-xs text-gray-600 -mt-3">{item.profession}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
