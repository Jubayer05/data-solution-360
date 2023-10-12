import Link from 'next/link';
import React from 'react';
import YoutubeEmbed from '../utilities/YoutubeEmbed';

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-col lg:flex-row gap-4 px-2">
        <div className="flex-1">
          <YoutubeEmbed embedId="r2AUYW4Vh5E" />
        </div>
        <div className="flex-1 p-2 md:pl-14">
          <h2 className="text-[26px] md:text-3xl font-heading text-headerMain">
            For your successful career Data Solution - 360 is always with you.
          </h2>
          <p className="text-lg">
            Bangladeshi number one data science learning platform.
          </p>
          <Link href="/about-us">
            <button className="text-xl font-semibold px-8 py-4 border-2 rounded-xl  hover:bg-primary-bg transition-all duration-300 ease-linear bg-white text-primary hover:text-white border-primary">
              Know About Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
