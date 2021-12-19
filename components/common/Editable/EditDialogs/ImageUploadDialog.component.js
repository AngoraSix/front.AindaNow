import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ImageUploadDialog = ({
  open,
  handleDialogClose,
  onEditSubmit,
  fieldValue,
}) => {
  const [currentFieldValue, setCurrentFieldValue] = useState(fieldValue);

  const handleChange = (event) => {
    setCurrentFieldValue(event.target.value);
  };

  const onSubmit = async () => {
    await onEditSubmit(currentFieldValue);
    handleDialogClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          value={currentFieldValue}
          onChange={handleChange}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button onClick={onSubmit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

ImageUploadDialog.defaultProps = {
  open: false,
  currentValue: '',
};

ImageUploadDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
  currentValue: PropTypes.string,
};

export default ImageUploadDialog;
