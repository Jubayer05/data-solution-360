import React from 'react';
import Team from './Team';

const About = () => {
  return (
    <div className="bg-[#edf2f5]">
      <div className="pt-24 max-w-6xl mx-auto ">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-3xl font-bold font-heading mt-8 text-headerMain	">
            About Us
          </h2>

          <p className="text-lg p-5">
            <strong> Data Solution-360</strong> is a data science, artificial
            intelligence, machine learning, and data analytics consulting
            company. We provide quality services to our clients. We work
            tirelessly to make young people interested in the data science
            sector. We make them capable of earning by providing quality
            training and guideline. We want to unveil something new and
            innovative with data science in Bangladesh.
          </p>
        </div>
        <Team />
      </div>
    </div>
  );
};

export default About;
