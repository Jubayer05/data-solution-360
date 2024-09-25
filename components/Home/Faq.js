import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

import { Button, FaqComp } from '../index';

const Faq = () => {
  return (
    <div className="bg-[#f9f9fa]	py-4 md:py-20 px-3" id="courses">
      <div className="max-w-6xl bg-[#ffffff] py-4 md:py-8 mx-auto rounded-lg shadow">
        <h2 className="text-center text-3xl font-bold font-heading mt-4 text-headerMain">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-xl mt-3 text-gray-500">
          Ask your question and meet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 px-4 max-w-4xl mx-auto items-center mt-12">
          <div className="pr-6 col-span-5">
            <h2 className="font-bold text-2xl">
              Do you have any question? Please ask here we ready to support.
            </h2>
            <p className="my-3">
              If your question is not listed here, please feel free to make a
              manual support.
            </p>
            <Button
              color="#fff"
              bgColor="rgb(2, 7, 62)"
              text="Ask your question"
              size="sm"
              borderRadius="7px"
            >
              Ask your question
            </Button>
          </div>
          <div className="col-span-7">
            <FaqComp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

const Triggers = ({ item, triggerOpen }) => {
  return (
    <p className="flex justify-between items-center">
      <span>{item.question}</span>{' '}
      <span>
        {/* {item.id === triggerOpen.id ? <AiOutlineDown /> : <AiOutlineRight />} */}
        <BsChevronDown className="font-bold" />
      </span>
    </p>
  );
};
