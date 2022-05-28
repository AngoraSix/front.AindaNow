import PropTypes from 'prop-types';
import React from 'react';
import Youtube from 'react-youtube';

const YoutubePreview = ({
  media,
  autoplay,
  containerClassname,
  iframeClassname,
  onVideoEnd,
  onVideoReady,
}) => {
  const opts = {
    playerVars: {
      autoplay: autoplay ? 1 : 0,
      mute: autoplay ? 1 : 0,
      controls: autoplay ? 0 : 1,
      modestbranding: autoplay ? 0 : 1,
      rel: 0,
      disablekb: autoplay ? 1 : 0,
      showinfo: 0,
    },
  };

  return (
    <Youtube
      videoId={media.resourceId}
      opts={opts}
      className={iframeClassname}
      containerClassName={containerClassname}
      onEnd={onVideoEnd}
      onReady={onVideoReady}
      title="Embedded media"
    />
  );
};

YoutubePreview.defaultProps = {
  autoplay: false,
  containerClassname: 'Youtube__Container',
  iframeClassname: 'Youtube__Iframe',
  onVideoEnd: () => {},
  onVideoReady: () => {},
};

YoutubePreview.propTypes = {
  media: PropTypes.object.isRequired,
  autoplay: PropTypes.bool,
  containerClassname: PropTypes.string,
  iframeClassname: PropTypes.string,
  onVideoEnd: PropTypes.func,
  onVideoReady: PropTypes.func,
};

export default YoutubePreview;
