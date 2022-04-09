import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_TYPES } from '../../../../constants';
import { useNotifications } from '../../../../hooks/app';
import logger from '../../../../utils/logger';
import ImagePreview from './ImagePreview';
import YoutubePreview from './YoutubePreview';

const MEDIA_TYPES_TO_COMPONENTS_MAP = {
  [MEDIA_TYPES.IMAGE]: ImagePreview,
  [MEDIA_TYPES.VIDEO_YOUTUBE]: YoutubePreview,
};

const MediaPreview = ({ mediaType, ...args }) => {
  const { onError } = useNotifications();

  const Component = MEDIA_TYPES_TO_COMPONENTS_MAP[mediaType];

  if (Component == null) {
    const errorMsg = `Can't preview media, media type [${mediaType}] not supported`;
    onError(errorMsg);
    logger.error(errorMsg);
    return;
  }

  return <Component {...args} />;
};

MediaPreview.defaultProps = {};

MediaPreview.propTypes = {
  mediaType: PropTypes.string.isRequired,
};

export default MediaPreview;
