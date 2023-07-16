import React from 'react';
import YouTube from 'react-youtube';
import styles from '../../styles/freeCourse/FreeCourse.module.css';

const YouTubePlayer = ({ videoId }) => {
  const opts = {
    height: '330',
    width: '550',
    playerVars: {
      controls: 1,
      rel: 0,
      showinfo: 0, // hide video title and uploader info
      modestbranding: 1,
      disablekb: 1,
      disableShare: 0,
    },
  };

  return (
    <YouTube videoId={videoId} opts={opts} className={styles.youtube_player} />
  );
};

export default YouTubePlayer;
