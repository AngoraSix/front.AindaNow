import { Box, DialogContentText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import FileDragAndDrop from '../../FileDragAndDrop';

const ImageUploadDialog = ({ onChange, label }) => {
  return (
    <Box>
      {label && <DialogContentText>{label}</DialogContentText>}
      <FileDragAndDrop onChange={onChange} />
    </Box>
  );
};

ImageUploadDialog.defaultProps = {
  label: 'Browse or drop a file in the drop zone',
};

ImageUploadDialog.propTypes = {
  onInputSubmit: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default ImageUploadDialog;
