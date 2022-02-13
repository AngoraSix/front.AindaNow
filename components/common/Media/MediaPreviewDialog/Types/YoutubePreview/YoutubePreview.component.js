import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Media from '../../../../../../models/Media';

const YoutubePreview = ({ media }) => {
  return (
    <iframe
      className="MediaPreview__Youtube"
      height="500"
      src={`https://www.youtube.com/embed/${media.resourceId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded media"
    />
  );
};

YoutubePreview.defaultProps = {};

YoutubePreview.propTypes = {
  media: PropTypes.object,
};

export default YoutubePreview;
