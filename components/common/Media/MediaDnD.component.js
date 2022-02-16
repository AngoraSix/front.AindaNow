import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_OPTIONS, MEDIA_INPUT_STRATEGIES } from '../../../constants';
import MediaListDnD from './Strategies/MediaListDnD';
import MediaSingleDnD from './Strategies/MediaSingleDnD';

const MediaDnD = ({
  strategy,
  allowsMultiple,
  media,
  allowedMediaTypes,
  onMediaInput,
  onModifyMediaOrder,
  onRemoveMediaItem,
  limit,
}) => {
  return strategy === MEDIA_INPUT_STRATEGIES.LIST ? (
    <MediaListDnD
      media={media}
      allowedMediaTypes={allowedMediaTypes}
      onMediaInput={onMediaInput}
      onModifyMediaOrder={onModifyMediaOrder}
      onRemoveMediaItem={onRemoveMediaItem}
      limit={limit}
    />
  ) : (
    <MediaSingleDnD
      media={media}
      allowsMultiple={allowsMultiple}
      limit={limit}
      onMediaInput={onMediaInput}
    />
  );
};

MediaDnD.defaultProps = {
  strategy: MEDIA_INPUT_STRATEGIES.SINGLE,
  media: [],
  allowedMediaTypes: Object.values(MEDIA_OPTIONS),
  allowsMultiple: false,
  limit: 15,
};

MediaDnD.propTypes = {
  media: PropTypes.arrayOf(PropTypes.object),
  onMediaInput: PropTypes.func.isRequired,
  onModifyMediaOrder: PropTypes.func.isRequired,
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
  onRemoveMediaItem: PropTypes.func.isRequired,
  allowsMultiple: PropTypes.bool,
  strategy: PropTypes.oneOf(Object.values(MEDIA_INPUT_STRATEGIES)),
  limit: PropTypes.number,
};

export default MediaDnD;
