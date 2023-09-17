import PropTypes from 'prop-types';
import React from 'react';

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      // style={{ width: "600px" }}
      className="w-[340px] sm:w-[600px]"
      height="400"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
