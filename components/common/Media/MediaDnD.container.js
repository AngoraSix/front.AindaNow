import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { INPUT_FIELD_TYPES, MEDIA_OPTIONS } from '../../../constants';
import { useNotifications } from '../../../hooks/app';
import MediaDnD from './MediaDnD.component';

const MEDIA_TYPE_TO_OPTION = {
  [INPUT_FIELD_TYPES.YOUTUBEVIDEO]: MEDIA_OPTIONS.VIDEO_YOUTUBE,
  [INPUT_FIELD_TYPES.IMAGE]: MEDIA_OPTIONS.IMAGE,
};

const _readImageFile = async (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
};

const _getImageSrc = (file) => {
  let src = null;
  if (file) {
    if (typeof file === 'object' && file.blob) {
      src = file.blob;
    } else if (typeof file === 'string') {
      src = file;
    }
  }
  return src;
};

const _normalizeMedia = (mediaValue) => {
  return mediaValue instanceof File
    ? {
        type: INPUT_FIELD_TYPES.IMAGE,
        thumbnailUrl: mediaValue.blob,
        file: mediaValue,
      }
    : mediaValue;
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
    mediaInputs = (
      await Promise.all(
        mediaInputs.map(async (mediaDataElement) => {
          // if it's normalized
          if (
            mediaDataElement.thumbnailUrl &&
            allowedMediaTypes.includes(
              MEDIA_TYPE_TO_OPTION[mediaDataElement.type]
            )
          ) {
            return mediaDataElement;
          }
          // if it's not yet proccessed
          if (
            mediaDataElement.type?.startsWith('image/') &&
            allowedMediaTypes.includes(MEDIA_OPTIONS.IMAGE)
          ) {
            const blobURL = await loadImageSrc(mediaDataElement);
            mediaDataElement.blob = blobURL;
            return mediaDataElement;
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
    const normalizedMedia = mediaInputs.map(_normalizeMedia);
    onChange({
      target: {
        value: single ? normalizedMedia : [...mediaData, ...normalizedMedia],
      },
    });
  };

  const loadImageSrc = async (imageFile) => {
    let newImageSrc = imageFile ? _getImageSrc(imageFile) : null;
    try {
      if (!newImageSrc) {
        newImageSrc = await _readImageFile(imageFile);
      }
    } catch (err) {
      // do nothing.
    }
    return newImageSrc;
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
