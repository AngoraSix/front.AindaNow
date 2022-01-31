import PropTypes from 'prop-types';
import React from 'react';
import { INPUT_FIELD_TYPES, MEDIA_OPTIONS } from '../../../constants';
import { useNotifications } from '../../../hooks/app';
import { isImage, processImage } from '../../../utils/media/image';
import MediaDnD from './MediaDnD.component';
import Media from '../../../models/Media';

const MEDIA_TYPE_TO_OPTION = {
  [INPUT_FIELD_TYPES.YOUTUBEVIDEO]: MEDIA_OPTIONS.VIDEO_YOUTUBE,
  [INPUT_FIELD_TYPES.IMAGE]: MEDIA_OPTIONS.IMAGE,
};

const MediaDnDContainer = ({
  onChange,
  mediaData,
  single,
  allowedMediaTypes,
}) => {
  const { onError } = useNotifications();

  const onMediaInput = async (mediaInput) => {
    let mediaInputs =
      Array.isArray(mediaInput) || mediaInput instanceof FileList
        ? Array.from(mediaInput)
        : [mediaInput];
    // @TODO allow this, once we improve the single logic (Trello-l7DFMPvh)
    if (single) {
      mediaInputs = [mediaInputs[0]];
    }
    const normalizedMedia = (
      await Promise.all(
        mediaInputs.map(async (mediaDataElement) => {
          // if it's normalized/processed
          if (
            mediaDataElement instanceof Media &&
            allowedMediaTypes.includes(
              MEDIA_TYPE_TO_OPTION[mediaDataElement.mediaType]
            )
          ) {
            return mediaDataElement;
          }
          // if it's not yet proccessed (can only be image then)
          if (
            isImage(mediaDataElement) &&
            allowedMediaTypes.includes(MEDIA_OPTIONS.IMAGE)
          ) {
            return processImage(mediaDataElement);
          }
          // if none matched, show error
          else
            onError(
              single ? 'Input is not supported' : 'Not all input is supported'
            );
          return null;
        })
      )
    ).filter((media) => !!media);
    onChange({
      target: {
        value: single ? normalizedMedia : [...mediaData, ...normalizedMedia],
      },
    });
  };

  return (
    <MediaDnD
      single={single}
      onMediaInput={onMediaInput}
      media={mediaData}
      allowedMediaTypes={allowedMediaTypes}
    />
  );
};

MediaDnDContainer.defaultProps = {
  single: true,
  mediaData: [],
  allowedMediaTypes: Object.values(MEDIA_OPTIONS),
};

MediaDnDContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  single: PropTypes.bool,
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
  mediaData: PropTypes.arrayOf(PropTypes.object),
};

export default MediaDnDContainer;
