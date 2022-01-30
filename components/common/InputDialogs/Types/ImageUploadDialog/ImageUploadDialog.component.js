import { Box, DialogContentText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Media from '../../../Media';
import { MEDIA_OPTIONS } from '../../../../../constants';

const ImageUploadDialog = ({ onChange, label }) => {
  return (
    <Box>
      {label && <DialogContentText>{label}</DialogContentText>}
      <Media
        single={true}
        onChange={onChange}
        allowedMediaTypes={[MEDIA_OPTIONS.IMAGE]}
      />
    </Box>
  );
};

ImageUploadDialog.defaultProps = {
  label: 'Browse or drop a file in the drop zone',
};

ImageUploadDialog.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ImageUploadDialog;
