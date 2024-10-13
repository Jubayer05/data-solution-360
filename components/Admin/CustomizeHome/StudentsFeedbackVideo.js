import React, { useEffect, useState } from 'react';
import { loadData } from '../../../src/hooks/loadData';
import ManageYoutubeVideo from './utils/ManageYoutubeVideo';

const StudentFeedbackVideo = () => {
  const [youtubeVideo, setYouTubeVideo] = useState([]);

  useEffect(() => {
    loadData('youtubeVideo', setYouTubeVideo);
  }, []);

  const findVideo = youtubeVideo.find(
    (item) => item.id === 'FwHsK7rTQkUHslLBZZ45',
  );

  return (
    <div id="students_feedback_video">
      <ManageYoutubeVideo
        title="Students Feedback Video"
        videoInfo={findVideo}
      />
    </div>
  );
};

export default StudentFeedbackVideo;
