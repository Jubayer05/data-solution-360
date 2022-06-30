import React, { useState } from "react";
import { Collapse, Space } from "antd";
import { BsChevronDown } from "react-icons/bs";
import { faqData } from "../../src/data/data";

import { Button } from "../index";

const { Panel } = Collapse;

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

      <div className="grid grid-cols-1 md:grid-cols-2 px-4 max-w-4xl mx-auto items-center mt-12">
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
            <div key={item.id} className="m-5">
              <Collapse
                collapsible="header"
                expandIconPosition="end"
                defaultActiveKey={["1"]}
              >
                <Panel header={item.question} key={item.id}>
                  <p>{item.answer}</p>
                </Panel>
              </Collapse>
            </div>
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
