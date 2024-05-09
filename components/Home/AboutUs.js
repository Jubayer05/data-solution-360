import Link from 'next/link';
import React from 'react';
import { useStateContext } from '../../src/context/ContextProvider';
import YoutubeEmbed from '../utilities/YoutubeEmbed';

const AboutUs = () => {
  const { youtubeVideo } = useStateContext();

  const findVideo = youtubeVideo.find(
    (item) => item.key === 'JIURIsvWwmzyyiLM3kNS',
  );

  return (
    <div className="bg-[#f9f9fa]	py-4 md:pt-20 px-3" id="courses">
      <div className="max-w-6xl bg-[#ffffff] py-4 md:py-12 mx-auto rounded-lg shadow px-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-col lg:flex-row gap-4 px-2">
          <div className="flex-1">
            <YoutubeEmbed embedId={findVideo?.embedId} />
          </div>
          <div className="flex-1 p-2 md:pl-14">
            <h2 className="text-3xl font-bold font-heading mt-4 text-headerMain">
              For your successful career Data Solution - 360 is always with you.
            </h2>
            <p className="text-lg">
              Best Data Science and Data Analytics Learning Platform
            </p>
            <Link href="/about-us" className="inline-block mt-4">
              <button
                className="text-base font-semibold px-4 pb-3 pt-2 border-2 rounded-md
               bg-primary-bg transition-all duration-300 ease-linear hover:bg-white hover:text-primary
                text-white border-primary"
              >
                Know About Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
