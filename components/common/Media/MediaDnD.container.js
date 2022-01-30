import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { INPUT_FIELD_TYPES, MEDIA_OPTIONS } from '../../../constants';
import { useNotifications } from '../../../hooks/app';
import MediaDnD from './MediaDnD.component';

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
const MediaDnDContainer = ({ onChange, single, allowedMediaTypes }) => {
  const { onError } = useNotifications();
  const [media, setMedia] = useState([]);

  const onMediaInput = async (mediaInputs) => {
    let mediaData =
      Array.isArray(mediaInputs) || mediaInputs instanceof FileList
        ? Array.from(mediaInputs)
        : [mediaInputs];
    mediaData = (
      await Promise.all(
        mediaData.map(async (mediaDataElement) => {
          console.log('MAPPPP');
          console.log(mediaDataElement);
          if (
            mediaDataElement.type.startsWith('image/') &&
            allowedMediaTypes.includes(MEDIA_OPTIONS.IMAGE)
          ) {
            const blobURL = await loadImageSrc(mediaDataElement);
            mediaDataElement.blob = blobURL;
            return mediaDataElement;
          } else if (
            mediaDataElement.type === INPUT_FIELD_TYPES.YOUTUBEVIDEO &&
            allowedMediaTypes.includes(MEDIA_OPTIONS.IMAGE)
          ) {
            return mediaDataElement;
          }
          // if none matched, show error
          console.log('NONEEE');
          console.log(mediaDataElement);
          onError(
            single ? 'Input is not supported' : 'Not all input is supported'
          );
          return null;
        })
      )
    ).filter((media) => !!media);
    const normalizedMedia = mediaData.map(_normalizeMedia);
    setMedia(single ? normalizedMedia : [...media, ...normalizedMedia]);
    onChange({ target: { value: mediaData } });
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
      media={media}
      allowedMediaTypes={allowedMediaTypes}
    />
  );
};

MediaDnDContainer.defaultProps = {
  single: true,
  allowedMediaTypes: Object.values(MEDIA_OPTIONS),
};

MediaDnDContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  single: PropTypes.bool,
  allowedMediaTypes: PropTypes.arrayOf(PropTypes.string),
};

export default MediaDnDContainer;
