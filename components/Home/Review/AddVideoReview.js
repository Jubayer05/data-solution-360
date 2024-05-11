import Link from 'next/link';
import React from 'react';
import { useStateContext } from '../../../src/context/ContextProvider';
import YoutubeEmbed from '../../utilities/YoutubeEmbed';

const AddVideoReview = ({ bgWhite }) => {
  const { youtubeVideo } = useStateContext();

  const findVideo = youtubeVideo.find(
    (item) => item.key === 'FwHsK7rTQkUHslLBZZ45',
  );

  return (
    <div
      className={`${
        bgWhite ? 'bg-[#ffffff]' : 'bg-[#f9f9fa]'
      }	py-4 md:pb-10 px-3`}
      id="courses"
    >
      <div className="max-w-6xl bg-[#ffffff] py-4 md:py-12 mx-auto rounded-lg shadow px-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-col lg:flex-row gap-4 px-2">
          <div className="flex-1 p-2 md:pl-14">
            <div className="text-[rgb(32,180,134)] bg-[#d1fadf] w-fit px-3 py-1 rounded-full text-lg font-semibold">
              Feedback
            </div>
            <h2 className="capitalize text-3xl font-bold mt-4 font-heading text-headerMain">
              Listen from our <span className="text-[#ffab00]">learners</span>
            </h2>

            <p className="text-lg -mt-2">
              Take a moment to explore the insightful feedback provided by our
              students, sharing their invaluable experiences and perspectives on
              the course!
            </p>
            <Link href="/courses" className="inline-block mt-2">
              <button
                className="text-base font-semibold px-4 pb-3 pt-2 border-2 rounded-md
               bg-primary-bg transition-all duration-300 ease-linear hover:bg-white hover:text-primary
                text-white border-primary"
              >
                Explore Course
              </button>
            </Link>
          </div>
          <div className="flex-1">
            <YoutubeEmbed embedId={findVideo?.embedId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideoReview;
