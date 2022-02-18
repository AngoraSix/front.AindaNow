import { Box, DialogContentText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Media from '../../../Media';
import { MEDIA_TYPES, MEDIA_INPUT_STRATEGIES } from '../../../../../constants';

const ImageUploadInput = ({
  onChange,
  label,
  currentFieldValue,
  allowsMultiple,
}) => {
  return (
    <Box>
      {label && <DialogContentText>{label}</DialogContentText>}
      <Media
        allowsMultiple={allowsMultiple}
        strategy={MEDIA_INPUT_STRATEGIES.SINGLE}
        onChange={onChange}
        mediaData={currentFieldValue}
        allowedMediaTypes={[MEDIA_TYPES.IMAGE]}
      />
    </Box>
  );
};

ImageUploadInput.defaultProps = {
  label: 'Browse or drop a file in the drop zone',
  currentFieldValue: [],
  allowsMultiple: false,
};

ImageUploadInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  currentFieldValue: PropTypes.arrayOf(PropTypes.object),
  allowsMultiple: PropTypes.bool,
};

export default ImageUploadInput;
