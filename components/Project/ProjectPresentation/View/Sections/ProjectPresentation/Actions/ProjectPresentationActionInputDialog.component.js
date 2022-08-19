import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Zoom,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import FieldMaker from 'react-mui-fieldmaker';

const I18N_VALUES = null;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in={true} ref={ref} {...props} />;
});

const ProjectPresentationActionInputDialog = ({
  actionInputs,
  open,
  handleDialogClose,
  actionData,
  onActionInputChange,
  onSubmit,
}) => {
  return (
    <Dialog
      className="ProjectPresentation__Actions__Dialog__Container"
      open={!!open}
      onClose={handleDialogClose}
      maxWidth="xl"
      TransitionComponent={Transition}
    >
      <DialogContent>
        {open &&
          actionInputs.map((action) => (
            <FieldMaker
              key={action.key}
              label={I18N_VALUES?.[action.key] || action.key}
              type={action.type}
              required={action.required}
              value={actionData[action.key]}
              options={action.options}
              onChange={onActionInputChange(action.key)}
            />
          ))}
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
          disabled={!onSubmit}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProjectPresentationActionInputDialog.defaultProps = {
  open: false,
  actionInputs: [],
  actionData: {},
};

ProjectPresentationActionInputDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  actionInputs: PropTypes.array,
  actionData: PropTypes.object,
  onActionInputChange: PropTypes.func.isRequired,
};

export default ProjectPresentationActionInputDialog;
