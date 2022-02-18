import { Box, DialogContentText, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const TextInput = ({ currentFieldValue, onChange, label }) => {
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

TextInput.defaultProps = {
  currentFieldValue: '',
  label: 'Set new value',
};

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentFieldValue: PropTypes.string,
  label: PropTypes.string,
};

export default TextInput;
