import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId, url }) => {
  function extractVideoId(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.*v=)|youtu\.be\/)([^&\n?#]+)/;
    const match = url?.match(regex);
    return match ? match[1] : null;
  }

  const videoIdUrl = extractVideoId(url);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      controls: 1,
      rel: 0,
      showinfo: 0,
      modestbranding: 2,
      disablekb: 1,
      disableShare: 0,
      autoplay: 0, // Changed to prevent auto-play
    },
  };

  return (
    <div className="relative w-full aspect-video">
      <YouTube
        videoId={videoId || videoIdUrl}
        opts={opts}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};

export default YouTubePlayer;
