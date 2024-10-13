import React, { useEffect, useState } from 'react';
import { loadData } from '../../../src/hooks/loadData';
import ManageYoutubeVideo from './utils/ManageYoutubeVideo';

const HomeYoutube = () => {
  const [youtubeVideo, setYouTubeVideo] = useState([]);

  useEffect(() => {
    loadData('youtubeVideo', setYouTubeVideo);
  }, []);

  const findVideo = youtubeVideo.find(
    (item) => item.id === 'JIURIsvWwmzyyiLM3kNS',
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
