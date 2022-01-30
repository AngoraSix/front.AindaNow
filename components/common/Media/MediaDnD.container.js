import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNotifications } from '../../../hooks/app';
import { MEDIA_OPTIONS } from '../../../constants';
import MediaDnD from './MediaDnD.component';

const readImageFile = async (file) => {
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

const getImageSrc = (file) => {
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

const MediaDnDContainer = ({ onChange, single, allowedMediaTypes }) => {
  const { onError } = useNotifications();
  const [media, setMedia] = useState([]);

  const onMediaInput = async (mediaInputs) => {
    await processMedia(mediaInputs);
  };

  const processMedia = async (mediaInputs) => {
    let fileData = Array.from(mediaInputs);
    fileData = (
      await Promise.all(
        fileData.map(async (fileDataElement) => {
          if (
            fileDataElement.type.startsWith('image/') &&
            allowedMediaTypes.includes(MEDIA_OPTIONS.IMAGE)
          ) {
            const blobURL = await loadImageSrc(fileDataElement);
            fileDataElement.blob = blobURL;
            return fileDataElement;
          }
          // if none matched, show error
          onError(
            single ? 'Input is not supported' : 'Not all input is supported'
          );
          return null;
        })
      )
    ).filter((media) => !!media);
    setMedia(single ? fileData : [...media, ...fileData]);
    onChange({ target: { value: fileData } });
  };

  const loadImageSrc = async (imageFile) => {
    let newImageSrc = imageFile ? getImageSrc(imageFile) : null;
    try {
      if (!newImageSrc) {
        newImageSrc = await readImageFile(imageFile);
      }
      // setImageSrc(newImageSrc);
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
