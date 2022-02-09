import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_OPTIONS } from '../../../constants';
import MediaListDnD from './Strategies/MediaListDnD';
import MediaSingleDnD from './Strategies/MediaSingleDnD';

const MediaDnD = ({
  single,
  media,
  allowedMediaTypes,
  onMediaInput,
  onModifyMediaOrder,
}) => {
  return single ? (
    <MediaSingleDnD singleMedia={media?.[0]} onMediaInput={onMediaInput} />
  ) : (
    <MediaListDnD
      media={media}
      allowedMediaTypes={allowedMediaTypes}
      onMediaInput={onMediaInput}
      onModifyMediaOrder={onModifyMediaOrder}
    />
  );
};

MediaDnD.defaultProps = {
  single: true,
  media: [],
  allowedMediaTypes: Object.values(MEDIA_OPTIONS),
};

MediaDnD.propTypes = {
  single: PropTypes.bool,
  media: PropTypes.arrayOf(PropTypes.object),
  onMediaInput: PropTypes.func.isRequired,
  onModifyMediaOrder: PropTypes.func.isRequired,
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
};

export default MediaDnD;
