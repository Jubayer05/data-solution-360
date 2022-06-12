import React, { useEffect, useState } from "react";
import { technologyStack } from "../../data/data";
import { Icon } from "@iconify/react";

const Technology = () => {
  const [technologyItems, setTechnologyItems] = useState([]);
  const handleTechnology = (item) => {
    setTechnologyItems(item);
  };

  useEffect(() => {
    setTechnologyItems(technologyStack[0]);
  }, [technologyStack]);

  return (
    <div className="mt-16 mb-28">
      <h2 className="text-center text-4xl font-bold mb-3">Technology Stack</h2>
      <div className="w-36 h-1.5 bg-gradient-to-r from-orange-600 to-blue-700 rounded-full mx-auto"></div>
      <p className="text-center mt-6 text-xl w-2/3 mx-auto">
        The field of data science has evolved to a stage where no organization
        can ignore it while setting up their data science tech stack.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-5 justify-center mt-10">
        {technologyStack.map((item) => (
          <div
            key={item.id}
            className="border-1 h-16 flex items-center justify-center cursor-pointer"
            onClick={() => handleTechnology(item)}
            style={
              technologyItems.title === item.title
                ? { backgroundColor: "#027ad6", color: "#fff" }
                : {}
            }
          >
            {item.title}
          </div>
        ))}
      </div>

      <div className="flex justify-center flex-wrap gap-6 mt-8 max-w-4xl mx-auto">
        {technologyItems.technology?.map((item) => (
          <Icon key={item.id} icon={item.img} className="text-6xl mx-6 my-3" />
        ))}
      </div>
    </div>
  );
};

export default Technology;
