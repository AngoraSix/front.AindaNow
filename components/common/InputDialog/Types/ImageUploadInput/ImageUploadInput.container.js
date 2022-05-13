import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_TYPES } from '../../../../../constants';
import { useNotifications } from '../../../../../hooks/app';
import { asArray } from '../../../../../utils/helpers';
import resolveToMediaArray from '../../../../../utils/media/mediaProcessor';
import ImageUploadInput from './ImageUploadInput.component';

const ImageUploadInputContainer = ({
  allowsMultiple,
  onChange,
  currentFieldValue,
  limit,
  ...args
}) => {
  const { onError } = useNotifications();
  const handleMediaInput = async (files) => {
    const inputLimit = allowsMultiple ? limit : 1;
    let fileInput =
      Array.isArray(files) || files instanceof FileList
        ? Array.from(files)
        : [files];
    if (fileInput.length > inputLimit) {
      onError('Limit exceeded - removed additional entries');
      fileInput.splice(inputLimit);
    }
    // the only value of using resolveToMediaArray over processImage is that it checks it's an image file
    // might not be worth since the input should limit that already...
    const media = await resolveToMediaArray(fileInput, MEDIA_TYPES.IMAGE);
    onChange(media);
  };

  currentFieldValue = asArray(currentFieldValue, []);

  return (
    <ImageUploadInput
      handleMediaInput={handleMediaInput}
      media={currentFieldValue}
      allowsMultiple={allowsMultiple}
      {...args}
    />
  );
};

ImageUploadInputContainer.defaultProps = {
  limit: 15,
  currentFieldValue: null,
  allowsMultiple: false,
};

ImageUploadInputContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentFieldValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  limit: PropTypes.number,
  allowsMultiple: PropTypes.bool,
};
export default ImageUploadInputContainer;
