import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { BsChevronDown } from "react-icons/bs";
import { faqData } from "../../data/data";

import { Button } from "../index";

const Faq = () => {
  const [triggerOpen, setTriggerOpen] = useState(false);
  return (
    <div className="mt-16 mb-28 max-w-6xl mx-auto">
      <h2 className="text-center text-3xl font-bold">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-xl mt-3 text-gray-500">
        Ask your question and meet.
      </p>

      <div className="grid grid-cols-2 max-w-4xl mx-auto items-center mt-12">
        <div className="pr-6">
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
        <div className="flex-1">
          {faqData.map((item) => (
            <Collapsible
              key={item.id}
              trigger={<Triggers item={item} triggerOpen={triggerOpen} />}
              onTriggerOpening={() => setTriggerOpen(item)}
              onTriggerClosing={() => setTriggerOpen(item)}
              tabIndex={item.id}
              className="border-1 p-3"
            >
              <p>{item.answer}</p>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;

const Triggers = ({ item, triggerOpen }) => {
  console.log(triggerOpen);
  return (
    <p className="flex justify-between items-center">
      <span>{item.question}</span>{" "}
      <span>
        {/* {item.id === triggerOpen.id ? <AiOutlineDown /> : <AiOutlineRight />} */}
        <BsChevronDown className="font-bold" />
      </span>
    </p>
  );
};
