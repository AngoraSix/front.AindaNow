import { Box, DialogContentText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Media from '../../../Media';
import { MEDIA_OPTIONS } from '../../../../../constants';

const ImageUploadInput = ({ onChange, label, currentFieldValue }) => {
  return (
    <Box>
      {label && <DialogContentText>{label}</DialogContentText>}
      <Media
        single={true}
        onChange={onChange}
        mediaData={currentFieldValue}
        allowedMediaTypes={[MEDIA_OPTIONS.IMAGE]}
      />
    </Box>
  );
};

ImageUploadInput.defaultProps = {
  label: 'Browse or drop a file in the drop zone',
  currentFieldValue: [],
};

ImageUploadInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  currentFieldValue: PropTypes.arrayOf(PropTypes.object),
};

export default ImageUploadInput;
