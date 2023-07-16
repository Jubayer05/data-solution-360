import { Progress } from 'antd';
import React from 'react';
import YouTubePlayer from './YoutubePlayer';

const FreeCourse = () => {
  const progressBarStyle = {
    width: '400px',
    height: '20px',
    borderRadius: '10px',
  };

  const videoId = 'Sw9MqgeHS1k';

  return (
    <div className="max-w-6xl mx-auto flex justify-between items-start mt-8 overflow-hidden">
      <div className="rounded-xl  overflow-hidden">
        <YouTubePlayer videoId={videoId} />
      </div>
      <div>
        <h3 className="">This is the progress bar</h3>
        <Progress
          percent={50}
          strokeWidth={15}
          strokeColor="#1fafaa"
          trailColor="#f2f2f2"
          strokeLinecap="round"
          style={progressBarStyle}
        />
        {/* <Progress percent={70} status="exception" /> */}
      </div>
    </div>
  );
};

export default FreeCourse;
