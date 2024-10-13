import React from 'react';
import YouTube from 'react-youtube';
import styles from '../../styles/freeCourse/FreeCourse.module.css';

const YouTubePlayer = ({ videoId, url }) => {
  function extractVideoId(url) {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.*v=)|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  const videoIdUrl = extractVideoId(url);

  const opts = {
    height: '330',
    width: '550',
    playerVars: {
      controls: 1,
      rel: 0,
      showinfo: 0, // hide video title and uploader info
      modestbranding: 2,
      disablekb: 1,
      disableShare: 0,
      autoplay: 1, // Auto-play the video
      // controls: 0, // Hide controls
      rel: 0, // Disable related videos at the end
    },
  };

  return (
    <YouTube
      videoId={videoId || videoIdUrl}
      opts={opts}
      className={styles.youtube_player}
    />
  );
};

export default YouTubePlayer;
