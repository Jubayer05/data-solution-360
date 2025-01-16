import { Collapse } from 'antd';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { loadData } from '../../src/hooks/loadData';

const { Panel } = Collapse;

const Faq = ({ title }) => {
  const [showMore, setShowMore] = useState(false);
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    loadData('faqData', setFaqData, {
      orderBy: 'orderFaq',
      orderDirection: 'asc',
    });
  }, []);

  return (
    <div className="flex-1 font-bangla text-lg max-w-4xl mx-auto">
      {title && (
        <h2 className="text-center text-3xl font-bold font-heading my-10 text-headerMain">
          {title}
        </h2>
      )}
      {showMore
        ? faqData.map((item) => (
            <div key={item.key} className="m-5">
              <Collapse
                collapsible="header"
                expandIconPosition="end"
                defaultActiveKey={['1']}
              >
                <Panel
                  className="text-[14px] md:text-lg font-semibold"
                  header={item.faqTitle}
                  key={item.key}
                >
                  <div
                    className="text-base font-normal"
                    dangerouslySetInnerHTML={{ __html: item.faqAnswer }}
                  />
                </Panel>
              </Collapse>
            </div>
          ))
        : faqData?.slice(0, 4).map((item) => (
            <div key={item.key} className="m-5">
              <Collapse
                collapsible="header"
                expandIconPosition="end"
                defaultActiveKey={['1']}
              >
                <Panel
                  className="text-[14px] md:text-lg font-semibold"
                  header={item.faqTitle}
                  key={item.key}
                >
                  <div
                    className="text-base font-normal"
                    dangerouslySetInnerHTML={{ __html: item.faqAnswer }}
                  />
                </Panel>
              </Collapse>
            </div>
          ))}
      <div className="px-5 py-3">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-base font-semibold px-4 py-3 border-2 rounded-lg bg-white  
          transition-all duration-300 ease-linear hover:bg-primary-bg hover:text-white 
          text-primary border-primary w-full"
        >
          {showMore ? (
            <span className="flex items-center justify-center">
              See Less <ChevronUp className="ml-1" />
            </span>
          ) : (
            <span className="flex items-center justify-center">
              See More <ChevronDown className="ml-1" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Faq;
