/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { BiSolidHandRight } from 'react-icons/bi';

const Prospectus = () => {
  return (
    <div className="max-w-6xl mx-auto pb-20">
      <img
        className="w-[150px] md:w-[300px] mx-auto mt-10"
        src="/logo/logo.png"
        alt="Logo"
      />
      <div className="font-heading max-w-3xl mx-auto">
        <ItemComponent
          details="We study data to grow in the field of data analytics and to
            introduce a revolution."
        />
        <ItemComponent
          details="Our collaboration centered systems with our stackholders are robust
          and reliable."
        />

        <h2 className="text-center capitalize text-2xl mt-16 font-bold">
          Our Mission and Vision
        </h2>
        <ItemComponent
          details="Our mission is to introduce the best services towards our audience
          to ultimately develop a data driven country as our vision."
        />

        <h2 className="text-center capitalize text-2xl mt-16 font-bold">
          Our Meaningful Existence
        </h2>
        <h2 className="text-center capitalize text-xl mt-10 font-bold">
          Services
        </h2>
        <ItemComponent
          details="We serve company with analyzing their data and to make proper
          decisions. We serve our student community with different courses,
          learning materials and contents as well."
        />

        <h2 className="text-center capitalize text-xl mt-8 font-bold">
          Technology
        </h2>
        <ItemComponent
          details="We use the most recent technology and AI to serve our client in a
          structured and better way."
        />

        <h2 className="text-center capitalize text-xl mt-8 font-bold">
          Testimonials
        </h2>
        <ItemComponent
          details="We have trained 4000+ students and 95% of them are highly satisfied
          with our deliveries. Our clients are also happy working with us."
        />

        <h2 className="text-center capitalize text-2xl mt-16 font-bold">
          Our Courses are
        </h2>
        <ul className="list-disc list-inside text-lg capitalize">
          <li className="my-3">Data Analyst Bootcamp</li>
          <li className="my-3">Power bi</li>
          <li className="my-3">Python for data scientist and data analyst</li>
          <li className="my-3">Excel basic to advance</li>
        </ul>

        <h2 className="text-center capitalize text-2xl mt-16 font-bold">
          Our company services are
        </h2>
        <ul className="list-disc list-inside text-lg capitalize">
          <li className="my-3">Company data analysis</li>
          <li className="my-3">Decision making</li>
          <li className="my-3">Dashboard development</li>
        </ul>

        <h2 className="text-center capitalize text-2xl mt-16 font-bold">
          Our Details
        </h2>
        <ItemComponent details="+8801996-104096" strongText="Contact: " />
        <ItemComponent
          details="datasolution360.business@gmail.com"
          strongText="Mail Address: "
        />
        <ItemComponent
          details="Gudaraghat, Gulshan 1, Dhaka"
          strongText="Address: "
        />
        <ItemComponent
          details="www.datasolution360.com"
          strongText="Website: "
        />
      </div>
    </div>
  );
};

export default Prospectus;

const ItemComponent = ({ strongText, details }) => {
  return (
    <div className="flex justify-left items-start text-lg mt-2">
      <div>
        <BiSolidHandRight className="mt-1 text-xl" />
      </div>
      {strongText ? (
        <p className="ml-4">
          <strong>{strongText}</strong> {details}
        </p>
      ) : (
        <p className="ml-4">{details}</p>
      )}
    </div>
  );
};
