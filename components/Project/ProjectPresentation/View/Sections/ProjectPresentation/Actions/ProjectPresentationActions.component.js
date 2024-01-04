import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ROUTES, resolveRoute } from '../../../../../../../constants';
import ButtonsSkeleton from '../../../../../../common/Skeletons/ButtonsSkeleton.component';
import ProjectPresentationActionInputDialog from './ProjectPresentationActionInputDialog.component';
import { PROJECT_PRESENTATION_SUPPORTED_ACTIONS } from './ProjectPresentationActions.properties';

const ProjectPresentationActions = ({
  projectPresentation,
  onShowInterest,
  onWithdrawInterest,
  onActionDataChange,
  onRegisterAllClubs,
  onCreateManagement,
  onUpdateManagement,
  onGetManagement,
  actionFormData,
  actions,
  isLoading,
}) => {
  const { t } = useTranslation('project-presentations.view');
  const router = useRouter();
  const [selectedAction, setSelectedAction] = useState(null);

  const onDialogClose = () => {
    setSelectedAction(null);
  };

  const onActionSelected = (actionKey) => () => {
    if (actions[actionKey]?.template?.fields?.length) {
      setSelectedAction(actionKey);
    } else {
      submitAction(actionKey)();
    }
  };

  const submitAction = (actionKey) => () => {
    setSelectedAction(null);
    switch (actionKey) {
      case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.SHOW_INTEREST:
        onShowInterest();
        break;
      case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST:
        onWithdrawInterest();
        break;
      case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.REGISTER_ALL_CLUBS:
        onRegisterAllClubs();
        break;
      case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.CREATE_MANAGEMENT:
        onCreateManagement();
        break;
      case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.GET_MANAGEMENT:
        onGetManagement();
        break;
      case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.UPDATE_MANAGEMENT:
        onUpdateManagement();
        break;
      case PROJECT_PRESENTATION_SUPPORTED_ACTIONS.EDIT:
        router.push(
          resolveRoute(
            ROUTES.projects.presentations.edit,
            projectPresentation.projectId,
            projectPresentation.id
          )
        );
        break;
    }
  };

  const showInterestButtons = (
    <Tooltip
      key="showInterestButtons"
      title={t('project-presentations.actions.show-interest.tooltip')}
    >
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__ShowInterest"
        variant="contained"
        onClick={onActionSelected(
          PROJECT_PRESENTATION_SUPPORTED_ACTIONS.SHOW_INTEREST
        )}
      >
        <GroupAddIcon />
      </LoadingButton>
    </Tooltip>
  );

  const withdrawInterestButtons = (
    <Tooltip
      key="withdrawInterestButtons"
      title={t('project-presentations.actions.withdraw-interest.tooltip')}
    >
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__WithdrawInterest"
        variant="contained"
        onClick={onActionSelected(
          PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST
        )}
      >
        <GroupRemoveIcon />
      </LoadingButton>
    </Tooltip>
  );

  const registerAllClubsButtons = (
    <Tooltip
      key="registerAllClubsButtons"
      title={t('project-presentations.actions.register-all-clubs.tooltip')}
    >
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__RegisterAllClubs"
        variant="contained"
        onClick={onActionSelected(
          PROJECT_PRESENTATION_SUPPORTED_ACTIONS.REGISTER_ALL_CLUBS
        )}
      >
        <ConfirmationNumberIcon />
      </LoadingButton>
    </Tooltip>
  );

  const createProjectManagementButtons = (
    <Tooltip
      key="createProjectManagementButtons"
      title={t('project-presentations.actions.create-project-management.tooltip')}
    >
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__CreateProjectManagement"
        variant="contained"
        onClick={onActionSelected(PROJECT_PRESENTATION_SUPPORTED_ACTIONS.CREATE_MANAGEMENT)}
      >
        <AutoGraphIcon />
      </LoadingButton>
    </Tooltip>
  );

  const getProjectManagementButtons = (
    <Tooltip
      key="getProjectManagementButtons"
      title={t('project-presentations.actions.get-project-management.tooltip')}
    >
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__GetProjectManagement"
        variant="contained"
        onClick={onActionSelected(PROJECT_PRESENTATION_SUPPORTED_ACTIONS.GET_MANAGEMENT)}
        disabled
      >
        <ShowChartIcon />
      </LoadingButton>
    </Tooltip>
  );

  const updateProjectManagementButtons = (
    <Tooltip
      key="updateProjectManagementButtons"
      title={t('project-presentations.actions.update-project-management.tooltip')}
    >
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__UpdateProjectManagement"
        variant="contained"
        onClick={onActionSelected(PROJECT_PRESENTATION_SUPPORTED_ACTIONS.UPDATE_MANAGEMENT)}
        disabled
      >
        <SettingsIcon />
      </LoadingButton>
    </Tooltip>
  );

  const editButtons = (
    <Tooltip
      key="editButtons"
      title={t('project-presentations.actions.edit.tooltip')}
    >
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__Edit"
        variant="contained"
        onClick={onActionSelected(PROJECT_PRESENTATION_SUPPORTED_ACTIONS.EDIT)}
      >
        <EditIcon />
      </LoadingButton>
    </Tooltip>
  );

  const ACTION_COMPONENTS = {
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.EDIT]: editButtons,
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.SHOW_INTEREST]: showInterestButtons,
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.REGISTER_ALL_CLUBS]:
      registerAllClubsButtons,
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST]:
      withdrawInterestButtons,
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.CREATE_MANAGEMENT]: createProjectManagementButtons,
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.GET_MANAGEMENT]: getProjectManagementButtons,
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.UPDATE_MANAGEMENT]: updateProjectManagementButtons,
  };

  return !isLoading ? (
    Object.keys(actions).filter((text) => !text.includes('self')).length ? (
      <React.Fragment>
        <Box className="ProjectPresentation__Heading__Actions">
          {Object.entries(actions).map(([key]) => ACTION_COMPONENTS[key])}
        </Box>
        <ProjectPresentationActionInputDialog
          open={!!selectedAction}
          actionInputs={actions[selectedAction]?.template?.fields}
          handleDialogClose={onDialogClose}
          actionData={actionFormData}
          onActionInputChange={onActionDataChange}
          onSubmit={selectedAction && submitAction(selectedAction)}
        />
      </React.Fragment>
    ) : (
      <Tooltip
        key="noactions"
        title={t('project-presentations.actions.noactions.tooltip')}
      >
        <Box className="ProjectPresentation__Heading__Actions">
          <LoadingButton
            className="ProjectPresentation__Heading__NoActions"
            variant="contained"
            disabled
          >
            <DoNotTouchIcon />
          </LoadingButton>
        </Box>
      </Tooltip>
    )
  ) : (
    <Box className="ProjectPresentation__Heading__Actions__LoadingContainer">
      <ButtonsSkeleton />
    </Box>
  );
  // </Box>
};

ProjectPresentationActions.defaultProps = {
  isAdmin: false,
  isLoading: false,
  actionFormData: {},
};

ProjectPresentationActions.propTypes = {
  isAdmin: PropTypes.bool,
  isLoading: PropTypes.bool,
  projectPresentation: PropTypes.object.isRequired,
  onActionDataChange: PropTypes.func.isRequired,
  onShowInterest: PropTypes.func.isRequired,
  onWithdrawInterest: PropTypes.func.isRequired,
  onRegisterAllClubs: PropTypes.func.isRequired,
  onCreateManagement: PropTypes.func.isRequired,
  onUpdateManagement: PropTypes.func.isRequired,
  onGetManagement: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  actionFormData: PropTypes.object,
};

export default ProjectPresentationActions;
