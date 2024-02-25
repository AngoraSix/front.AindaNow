import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import SettingsIcon from '@mui/icons-material/Settings';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ButtonsSkeleton from '../../../../../../common/Skeletons/ButtonsSkeleton.component';
import ProjectPluginsActionInputDialog from './ProjectPluginsActionInputDialog.component';
import { PROJECT_PLUGINS_SUPPORTED_ACTIONS } from './ProjectPluginsActions.properties';

const ProjectPluginsActions = ({
  onActionDataChange,
  onCreateManagement,
  onUpdateManagement,
  onGetManagement,
  managementData,
  actionFormData,
  actions,
  isLoading,
}) => {
  const { t } = useTranslation('project-presentations.view');
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
      case PROJECT_PLUGINS_SUPPORTED_ACTIONS.CREATE_MANAGEMENT:
        onCreateManagement();
        break;
      case PROJECT_PLUGINS_SUPPORTED_ACTIONS.GET_MANAGEMENT:
        onGetManagement();
        break;
      case PROJECT_PLUGINS_SUPPORTED_ACTIONS.UPDATE_MANAGEMENT:
        onUpdateManagement();
        break;
    }
  };

  const createProjectManagementButtons = (
    <Tooltip
      key="createProjectManagementButtons"
      title={t(
        'project-presentations.actions.create-project-management.tooltip'
      )}
    >
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__CreateProjectManagement"
        variant="contained"
        onClick={onActionSelected(
          PROJECT_PLUGINS_SUPPORTED_ACTIONS.CREATE_MANAGEMENT
        )}
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
        onClick={onActionSelected(
          PROJECT_PLUGINS_SUPPORTED_ACTIONS.GET_MANAGEMENT
        )}
      >
        <ShowChartIcon />
      </LoadingButton>
    </Tooltip>
  );

  const updateProjectManagementButtons = (
    <Tooltip
      key="updateProjectManagementButtons"
      title={t(
        'project-presentations.actions.update-project-management.tooltip'
      )}
    >
      <LoadingButton
        className="ProjectPresentation__Heading__Actions__UpdateProjectManagement"
        variant="contained"
        onClick={onActionSelected(
          PROJECT_PLUGINS_SUPPORTED_ACTIONS.UPDATE_MANAGEMENT
        )}
      >
        <SettingsIcon />
      </LoadingButton>
    </Tooltip>
  );


  const ACTION_COMPONENTS = {
    [PROJECT_PLUGINS_SUPPORTED_ACTIONS.CREATE_MANAGEMENT]:
      createProjectManagementButtons,
    [PROJECT_PLUGINS_SUPPORTED_ACTIONS.GET_MANAGEMENT]:
      getProjectManagementButtons,
    [PROJECT_PLUGINS_SUPPORTED_ACTIONS.UPDATE_MANAGEMENT]:
      updateProjectManagementButtons,
  };

  return !isLoading ? (
    Object.keys(actions).filter((text) => !text.includes('self')).length ? (
      <React.Fragment>
        <Box className="ProjectPresentation__Heading__Actions">
          {Object.entries(actions).map(([key]) => ACTION_COMPONENTS[key])}
        </Box>
        <ProjectPluginsActionInputDialog
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
};

ProjectPluginsActions.defaultProps = {
  isAdmin: false,
  isLoading: false,
  actionFormData: {},
};

ProjectPluginsActions.propTypes = {
  isAdmin: PropTypes.bool,
  isLoading: PropTypes.bool,
  projectPresentation: PropTypes.object.isRequired,
  onActionDataChange: PropTypes.func.isRequired,
  onCreateManagement: PropTypes.func.isRequired,
  onUpdateManagement: PropTypes.func.isRequired,
  onGetManagement: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  actionFormData: PropTypes.object,
};

export default ProjectPluginsActions;
