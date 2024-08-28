import React from 'react';
import { useStateContext } from '../../../src/context/ContextProvider';
import ManageYoutubeVideo from './utils/ManageYoutubeVideo';

const HomeYoutube = () => {
  const { youtubeVideo } = useStateContext();

  const findVideo = youtubeVideo.find(
    (item) => item.key === 'JIURIsvWwmzyyiLM3kNS',
  );

  return (
    <div id="home_youtube">
      <ManageYoutubeVideo
        title="Students Feedback Video"
        videoInfo={findVideo}
      />
    </div>
  );
};

export default HomeYoutube;
