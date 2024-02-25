import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Zoom,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import FieldMaker from 'react-mui-fieldmaker';

const I18N_VALUES = {
  contact: 'project-presentations.actions.dialog.inputs.contact',
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in={true} ref={ref} {...props} />;
});

const ProjectPluginsActionInputDialog = ({
  actionInputs,
  open,
  handleDialogClose,
  actionData,
  onActionInputChange,
  title,
  onSubmit,
}) => {
  const { t } = useTranslation('project-presentations.view');

  return (
    <Dialog
      className="ProjectPresentation__Actions__Dialog__Container"
      open={!!open}
      onClose={handleDialogClose}
      maxWidth="xl"
      TransitionComponent={Transition}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {open &&
          actionInputs.map((action) => (
            <FieldMaker
              key={action.key}
              label={
                I18N_VALUES?.[action.key]
                  ? t(I18N_VALUES[action.key])
                  : action.key
              }
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
          {t('project-presentations.actions.dialog.commands.cancel')}
        </Button>
        <Button
          className="Dialog__Button__Save"
          onClick={onSubmit}
          sx={{ color: 'primary.dark' }}
          disabled={!onSubmit}
        >
          {t('project-presentations.actions.dialog.commands.done')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProjectPluginsActionInputDialog.defaultProps = {
  open: false,
  actionInputs: [],
  actionData: {},
  title: 'Required Data',
};

ProjectPluginsActionInputDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  actionInputs: PropTypes.array,
  actionData: PropTypes.object,
  onActionInputChange: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default ProjectPluginsActionInputDialog;
