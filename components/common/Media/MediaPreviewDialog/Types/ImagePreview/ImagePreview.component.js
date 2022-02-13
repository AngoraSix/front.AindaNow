import PropTypes from 'prop-types';
import React from 'react';

const ImagePreview = ({ media }) => {
  return <img className="MediaPreview__Image" src={media?.thumbnailUrl} />;
};

ImagePreview.defaultProps = {};

ImagePreview.propTypes = {
  media: PropTypes.object,
};

export default ImagePreview;
