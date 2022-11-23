import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { INPUT_FIELD_TYPES } from '../../../constants';
import ImageUploadInput from './Types/ImageUploadInput';
import TextInput from './Types/TextInput';
import YoutubeInput from './Types/YoutubeInput';

const INPUT_DIALOG_TYPES_MAP = {
  [INPUT_FIELD_TYPES.IMAGE]: ImageUploadInput,
  [INPUT_FIELD_TYPES.TEXT]: TextInput,
  [INPUT_FIELD_TYPES.YOUTUBEVIDEO]: YoutubeInput,
};

const InputDialogContainer = ({
  inputType,
  open,
  handleDialogClose,
  onInputSubmit,
  fieldValue,
  title,
  allowsMultiple,
  ...args
}) => {
  const { t } = useTranslation('common');
  const [currentFieldValue, setCurrentFieldValue] = useState(fieldValue);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (value) => {
    setCurrentFieldValue(value);
  };

  const onSubmit = async () => {
    await onInputSubmit(currentFieldValue);
    setCurrentFieldValue(undefined);
    handleDialogClose();
  };

  const onDialogClose = () => {
    setCurrentFieldValue(undefined);
    handleDialogClose();
  };

  const InputDialogComponent = INPUT_DIALOG_TYPES_MAP[inputType] || TextInput;

  return (
    <Dialog
      open={!!open && !!inputType}
      onClose={onDialogClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{t(title)}</DialogTitle>
      <DialogContent>
        <InputDialogComponent
          currentFieldValue={currentFieldValue}
          onChange={handleChange}
          setIsValid={setIsValid}
          allowsMultiple={allowsMultiple}
          {...args}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className="Dialog__Button__Cancel"
          onClick={handleDialogClose}
          sx={{ color: 'primary.light' }}
        >
          {t('common.commands.cancel')}
        </Button>
        <Button
          className="Dialog__Button__Save"
          onClick={onSubmit}
          sx={{ color: 'primary.dark' }}
          disabled={!isValid}
        >
          {t('common.commands.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

InputDialogContainer.defaultProps = {
  open: false,
  inputType: INPUT_FIELD_TYPES.TEXT,
  title: 'common.input-dialog.title',
  allowsMultiple: false,
};

InputDialogContainer.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  onInputSubmit: PropTypes.func.isRequired,
  fieldValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  inputType: PropTypes.string,
  allowsMultiple: PropTypes.bool,
};

export default InputDialogContainer;
