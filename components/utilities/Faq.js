import { Collapse } from 'antd';
import React from 'react';
const { Panel } = Collapse;

const Faq = ({ data, title }) => {
  return (
    <div className="flex-1 font-bangla text-lg max-w-4xl mx-auto">
      {title && (
        <h2 className="text-center text-3xl font-bold font-heading my-10 text-headerMain">
          {title}
        </h2>
      )}
      {data.map((item) => (
        <div key={item.id} className="m-5">
          <Collapse
            collapsible="header"
            expandIconPosition="end"
            defaultActiveKey={['1']}
          >
            <Panel
              className="text-lg font-semibold"
              header={item.question}
              key={item.id}
            >
              <div className="text-base font-normal">{item.answer}</div>
            </Panel>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default Faq;
