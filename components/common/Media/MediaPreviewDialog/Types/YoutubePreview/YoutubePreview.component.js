import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../../../../config';

const YoutubePreview = ({ media }) => {
  const resolvedEmbedUrl = config.thirdParties.youtube.embedUrlPattern.replace(
    ':resourceId',
    media.resourceId
  );
  return (
    <iframe
      className="MediaPreview__Youtube"
      height="500"
      src={resolvedEmbedUrl}
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
