import { Box, DialogContentText, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const TextDialog = ({ currentFieldValue, onChange, label }) => {
  const handleChange = ({ target: { value } }) => {
    onChange(value);
  };

  return (
    <Box>
      {label && <DialogContentText>{label}</DialogContentText>}
      <TextField
        label="New value"
        value={currentFieldValue}
        onChange={handleChange}
        fullWidth
      />
    </Box>
  );
};

TextDialog.defaultProps = {
  currentFieldValue: '',
  label: 'Set new value',
};

TextDialog.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentFieldValue: PropTypes.string,
  label: PropTypes.string,
};

export default TextDialog;
