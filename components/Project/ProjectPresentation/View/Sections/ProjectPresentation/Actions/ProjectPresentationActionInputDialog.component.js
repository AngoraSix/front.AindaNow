import { Dialog, DialogContent, Zoom } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import FieldMaker from 'react-mui-fieldmaker';

const I18N_VALUES = null;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in={true} ref={ref} {...props} />;
});

const ProjectPresentationActionInputDialog = ({ actionInputs, open, handleDialogClose, actionData, onActionInputChange }) => {
  return (
    <Dialog
      className="ProjectPresentation__Actions__Dialog__Container"
      open={!!open}
      onClose={handleDialogClose}
      maxWidth="xl"
      TransitionComponent={Transition}
    >
      <DialogContent>
        {open && actionInputs.map( action =>
          <FieldMaker
          key={action.key}
          label={I18N_VALUES?.[action.key] || action.key}
          type={action.type}
          required={action.required}
          value={actionData[action.key]}
          options={action.options}
          onChange={onActionInputChange(action.key)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

ProjectPresentationActionInputDialog.defaultProps = {
  open: false,
  actionInputs: []
};

ProjectPresentationActionInputDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired
};

export default ProjectPresentationActionInputDialog;
