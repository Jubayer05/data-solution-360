import React from 'react';
import { useStateContext } from '../../src/context/ContextProvider';

const Technology = () => {
  const { userEmail, technologyStack } = useStateContext();
  return (
    <div className="bg-[#f9f9fa]	py-4 md:pt-20 px-3" id="courses">
      <div className="max-w-6xl bg-[#ffffff] py-4 md:py-8 mx-auto rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold font-heading mt-4 text-headerMain">
          Technology Stack
        </h2>
        <div className="w-36 h-1.5 bg-gradient-to-r from-orange-600 to-blue-700 rounded-full mx-auto"></div>
        <p className="text-center mt-6 text-sm md:text-xl sm:w-2/3 mx-auto px-4">
          The field of data science has evolved to a stage where no organization
          can ignore it while setting up their data science tech stack.
        </p>

        {/* <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-5 justify-center mt-10 px-4">
        {technologyStack.map((item) => (
          <div
            key={item.id}
            className="border-1 h-16 flex items-center justify-center cursor-pointer"
            onClick={() => handleTechnology(item)}
            style={
              technologyItems.title === item.title
                ? { backgroundColor: '#027ad6', color: '#fff' }
                : {}
            }
          >
            {item.title}
          </div>
        ))}
      </div> */}

        <div className="flex justify-center items-center flex-wrap gap-6 mt-8 max-w-5xl mx-auto">
          {technologyStack?.map((item) => (
            <div
              key={item.key}
              className="bg-white shadow-md w-20 h-20 md:w-28 md:h-28 flex items-center 
              justify-center flex-col rounded-lg overflow-hidden"
            >
              <img src={item.img} alt="" className="w-12 md:w-20" />
              <p className="m-0 text-sm md:text-base ">{item?.titleIcon}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technology;
