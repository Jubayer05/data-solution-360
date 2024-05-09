/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useStateContext } from '../../../src/context/ContextProvider';
import ManageYoutubeVideo from './utils/ManageYoutubeVideo';

const StudentFeedbackVideo = () => {
  const { youtubeVideo } = useStateContext();

  const findVideo = youtubeVideo.find(
    (item) => item.key === 'FwHsK7rTQkUHslLBZZ45',
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
