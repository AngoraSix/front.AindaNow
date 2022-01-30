import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { INPUT_FIELD_TYPES } from '../../../constants';
import ImageUploadDialog from './Types/ImageUploadDialog';
import TextDialog from './Types/TextDialog';
import YoutubeVideoDialog from './Types/YoutubeVideoDialog';

const INPUT_DIALOG_TYPES_MAP = {
  [INPUT_FIELD_TYPES.IMAGE]: ImageUploadDialog,
  [INPUT_FIELD_TYPES.TEXT]: TextDialog,
  [INPUT_FIELD_TYPES.YOUTUBEVIDEO]: YoutubeVideoDialog,
};

const InputDialogContainer = ({
  inputType,
  open,
  handleDialogClose,
  onInputSubmit,
  fieldValue,
  title,
  ...args
}) => {
  const [currentFieldValue, setCurrentFieldValue] = useState(fieldValue);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    setCurrentFieldValue(event.target.value);
  };

  const onSubmit = async () => {
    await onInputSubmit(currentFieldValue);
    handleDialogClose();
  };

  const InputDialogComponent = INPUT_DIALOG_TYPES_MAP[inputType] || TextDialog;

  return (
    <Dialog
      open={!!open && !!inputType}
      onClose={handleDialogClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <InputDialogComponent
          currentFieldValue={currentFieldValue}
          onChange={handleChange}
          setIsValid={setIsValid}
          {...args}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className="Dialog__Button__Cancel"
          onClick={handleDialogClose}
          sx={{ color: 'primary.light' }}
        >
          Cancel
        </Button>
        <Button
          className="Dialog__Button__Save"
          onClick={onSubmit}
          sx={{ color: 'primary.dark' }}
          disabled={!isValid}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InputDialogContainer.defaultProps = {
  open: false,
  fieldValue: '',
  inputType: INPUT_FIELD_TYPES.TEXT,
  title: 'Fill in',
};

InputDialogContainer.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  onInputSubmit: PropTypes.func.isRequired,
  fieldValue: PropTypes.string,
  inputType: PropTypes.string,
};

export default InputDialogContainer;
