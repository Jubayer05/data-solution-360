import React, { useEffect, useState } from 'react';
import { loadData } from '../../../src/hooks/loadData';
import YoutubeEmbed from '../../utilities/YoutubeEmbed';

const AddVideoReview = ({ coursePage }) => {
  const [youtubeVideo, setYouTubeVideo] = useState([]);

  useEffect(() => {
    loadData('youtubeVideo', setYouTubeVideo);
  }, []);

  const findVideo = youtubeVideo.find(
    (item) => item.id === 'FwHsK7rTQkUHslLBZZ45',
  );

  return (
    <div
      className={`${
        coursePage ? 'bg-[#ffffff]' : 'bg-[#f9f9fa]'
      }	py-4 md:pb-10 px-3`}
      id="courses"
    >
      <div className="max-w-6xl bg-[#ffffff] py-4 md:py-12 mx-auto rounded-lg shadow px-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-col lg:flex-row gap-4 px-2">
          <div className="flex-1 p-2 md:pl-14">
            <h2 className="capitalize text-3xl font-bold mt-4 font-heading text-headerMain">
              Listen from our <span className="text-[#ffab00]">learners</span>
            </h2>

            <p className="text-lg mt-5">
              Take a moment to explore the insightful feedback provided by our
              students, sharing their invaluable experiences and perspectives on
              the course!
            </p>
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
