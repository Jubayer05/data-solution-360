/* eslint-disable @next/next/no-img-element */
import React from "react";

const People = () => {
  const peoples = [
    {
      name: "Person 1",
      profession: "Intern",
      img: "/team/sakib.jpg",
    },
    {
      name: "Person 1",
      profession: "Intern",
      img: "/team/Shamim.jpg",
    },
    {
      name: "Person 1",
      profession: "Intern",
      img: "/team/ashraful.jpg",
    },
    {
      name: "Person 1",
      profession: "Intern",
      img: "/team/Farhad.png",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-7 pb-20 px-3 ">
        {peoples.map((item) => (
          <div key={item.name} className="w-full border-1">
            <img
              className="h-72 w-full transition-all 0.2s"
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1621&q=80"
              alt=""
            />
            <div className="px-4 pb-4">
              <p className="text-[20px] text-gray-900 font-semibold mt-2">
                {item.name}
              </p>
              <p className="text-md -mt-4 text-[tomato]">{item.profession}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
