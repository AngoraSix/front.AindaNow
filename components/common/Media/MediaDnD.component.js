import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import MediaListDnD from './Strategies/MediaListDnD.component';
import MediaSingleDnD from './Strategies/MediaSingleDnD.component';
import { MEDIA_OPTIONS } from '../../../constants';

const Input = styled('input')({
  display: 'none',
});

const MediaDnD = ({ single, media, allowedMediaTypes, onMediaInput }) => {
  return single ? (
    <MediaSingleDnD singleMedia={media?.[0]} onMediaInput={onMediaInput} />
  ) : (
    <MediaListDnD
      media={media}
      allowedMediaTypes={allowedMediaTypes}
      onMediaInput={onMediaInput}
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
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
};

export default MediaDnD;
