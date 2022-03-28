import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_TYPES } from '../../../../../constants';
import { useNotifications } from '../../../../../hooks/app';
import Media from '../../../../../models/Media';
import ImageUploadInput from './ImageUploadInput.component';

const ImageUploadInputContainer = ({
  allowsMultiple,
  onChange,
  currentFieldValue,
  limit,
  ...args
}) => {
  const { onError } = useNotifications();
  const handleMediaInput = (files) => {
    const inputLimit = allowsMultiple ? limit : 1;
    let fileInput =
      Array.isArray(files) || files instanceof FileList
        ? Array.from(files)
        : [files];
    if (fileInput.length > inputLimit) {
      onError('Limit exceeded - removed additional entries');
      fileInput.splice(inputLimit);
    }
    if (fileInput) {
      onChange(fileInput);
    } else {
      onChange(fileInput.slice(0, 1));
    }
  };

  if (currentFieldValue) {
    currentFieldValue = Array.isArray(currentFieldValue)
      ? currentFieldValue
      : [currentFieldValue];
    currentFieldValue.map((cfv) =>
      cfv instanceof Media ? cfv : new Media(MEDIA_TYPES.IMAGE, cfv, cfv)
    );
  } else {
    currentFieldValue = [];
  }

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
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  limit: PropTypes.number,
  allowsMultiple: PropTypes.bool,
};
export default ImageUploadInputContainer;
