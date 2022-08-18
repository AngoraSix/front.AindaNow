import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { resolveRoute, ROUTES } from '../../../../../../../constants';
import { useActiveSession } from '../../../../../../../hooks/oauth';
import CircleLoadingButton from '../../../../../../common/Skeletons/CircleLoadingButton.component';
import ProjectPresentationActionInputDialog from './ProjectPresentationActionInputDialog.component';
import { PROJECT_PRESENTATION_SUPPORTED_ACTIONS } from './ProjectPresentationActions.properties';

const ProjectPresentationActions = ({
  projectPresentation,
  onShowInterest,
  onWithdrawInterest,
  onActionDataChange,
  actionFormData,
  actions,
  isAdmin,
}) => {
  const router = useRouter();
  const { session } = useActiveSession();
  const activeSession = session && !session.error;
  const [selectedAction, setSelectedAction] = useState(null);

  const onDialogSubmit =
    (actionFn) =>
    (...args) => {
      setSelectedAction(null);
      actionFn(...args);
    };

  const onActionSelected = (actionKey) => () => {
    if (actions[actionKey]?.template?.fields?.length) {
      setSelectedAction(actionKey);
    } else {
      switch (actionKey) {
        case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.SHOW_INTEREST:
          onShowInterest();
          break;
        case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST:
          onWithdrawInterest();
        case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.EDIT:
          router.push(
            resolveRoute(ROUTES.projects.edit, projectPresentation.projectId)
          );
          break;
      }
    }
  };

  const showInterestButtons = (
    <React.Fragment key="showInterestButtons">
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__ShowInterest"
        variant="contained"
        loading={!activeSession}
        startIcon={<GroupAddIcon />}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        onClick={onActionSelected(
          PROJECT_PRESENTATION_SUPPORTED_ACTIONS.SHOW_INTEREST
        )}
      >
        I'm Interested!
      </LoadingButton>
      <CircleLoadingButton
        className="ProjectPresentation__Heading__Actions__ShowInterest"
        loading={!activeSession}
        sxDisplay={{ xs: 'flex', sm: 'none' }}
        onClick={onActionSelected(
          PROJECT_PRESENTATION_SUPPORTED_ACTIONS.SHOW_INTEREST
        )}
      >
        <GroupAddIcon fontSize="small" />
      </CircleLoadingButton>
    </React.Fragment>
  );

  const withdrawInterestButtons = (
    <React.Fragment key="withdrawInterestButtons">
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__WithdrawInterest"
        variant="contained"
        loading={!activeSession}
        startIcon={<GroupRemoveIcon />}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        onClick={onActionSelected(
          PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST
        )}
      >
        Not Interested...
      </LoadingButton>
      <CircleLoadingButton
        className="ProjectPresentation__Heading__Actions__WithdrawInterest"
        loading={!activeSession}
        sxDisplay={{ xs: 'flex', sm: 'none' }}
        onClick={onActionSelected(
          PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST
        )}
      >
        <GroupRemoveIcon fontSize="small" />
      </CircleLoadingButton>
    </React.Fragment>
  );

  const editButtons = (
    <React.Fragment key="editButtons">
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__Edit"
        variant="contained"
        loading={!activeSession}
        startIcon={<EditIcon />}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
        onClick={onActionSelected(PROJECT_PRESENTATION_SUPPORTED_ACTIONS.EDIT)}
      >
        Edit
      </LoadingButton>
      <CircleLoadingButton
        className="ProjectPresentation__Heading__Actions__Edit"
        loading={!activeSession}
        sxDisplay={{ xs: 'flex', sm: 'none' }}
        onClick={onActionSelected(PROJECT_PRESENTATION_SUPPORTED_ACTIONS.EDIT)}
      >
        <EditIcon fontSize="small" />
      </CircleLoadingButton>
    </React.Fragment>
  );

  const ACTION_COMPONENTS = {
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.EDIT]: editButtons,
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.SHOW_INTEREST]: showInterestButtons,
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST]:
      withdrawInterestButtons,
  };

  return activeSession ? (
    <React.Fragment>
      <Box className="ProjectPresentation__Heading__Actions">
        {Object.entries(actions).map(([key]) => ACTION_COMPONENTS[key])}
      </Box>
      <ProjectPresentationActionInputDialog
        open={!!selectedAction}
        actionInputs={actions[selectedAction]?.template?.fields}
        handleDialogClose={onDialogSubmit}
        actionData={actionFormData}
        onActionInputChange={onActionDataChange}
      />
    </React.Fragment>
  ) : (
    <Box></Box>
  );
};

ProjectPresentationActions.defaultProps = {
  isAdmin: false,
  actionFormData: {},
};

ProjectPresentationActions.propTypes = {
  isAdmin: PropTypes.bool,
  projectPresentation: PropTypes.object.isRequired,
  onActionDataChange: PropTypes.func.isRequired,
  onShowInterest: PropTypes.func.isRequired,
  actionFormData: PropTypes.object,
};

export default ProjectPresentationActions;
