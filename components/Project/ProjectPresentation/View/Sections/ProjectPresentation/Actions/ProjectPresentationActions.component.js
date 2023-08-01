import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ROUTES, resolveRoute } from '../../../../../../../constants';
import CircleLoadingButton from '../../../../../../common/Skeletons/CircleLoadingButton.component';
import ProjectPresentationActionInputDialog from './ProjectPresentationActionInputDialog.component';
import { PROJECT_PRESENTATION_SUPPORTED_ACTIONS } from './ProjectPresentationActions.properties';

const ProjectPresentationActions = ({
  projectPresentation,
  onShowInterest,
  onWithdrawInterest,
  onActionDataChange,
  onRegisterAllClubs,
  actionFormData,
  actions,
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
    <React.Fragment key="showInterestButtons">
      <Tooltip title={t('project-presentations.actions.show-interest.tooltip')}>
        <LoadingButton
          className="ProjectPresentation__Heading__Actions__ShowInterest"
          variant="contained"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={onActionSelected(
            PROJECT_PRESENTATION_SUPPORTED_ACTIONS.SHOW_INTEREST
          )}
        >
          <GroupAddIcon />
        </LoadingButton>
      </Tooltip>
      <CircleLoadingButton
        className="ProjectPresentation__Heading__Actions__ShowInterest"
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
      <Tooltip
        title={t('project-presentations.actions.withdraw-interest.tooltip')}
      >
        <LoadingButton
          className="ProjectPresentation__Heading__Actions__WithdrawInterest"
          variant="contained"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={onActionSelected(
            PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST
          )}
        >
          <GroupRemoveIcon />
        </LoadingButton>
      </Tooltip>
      <CircleLoadingButton
        className="ProjectPresentation__Heading__Actions__WithdrawInterest"
        sxDisplay={{ xs: 'flex', sm: 'none' }}
        onClick={onActionSelected(
          PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST
        )}
      >
        <GroupRemoveIcon fontSize="small" />
      </CircleLoadingButton>
    </React.Fragment>
  );

  const registerAllClubsButtons = (
    <React.Fragment key="registerAllClubsButtons">
      <Tooltip
        title={t('project-presentations.actions.register-all-clubs.tooltip')}
      >
        <LoadingButton
          className="ProjectPresentation__Heading__Actions__RegisterAllClubs"
          variant="contained"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={onActionSelected(
            PROJECT_PRESENTATION_SUPPORTED_ACTIONS.REGISTER_ALL_CLUBS
          )}
        >
          <ConfirmationNumberIcon />
        </LoadingButton>
      </Tooltip>
      <CircleLoadingButton
        className="ProjectPresentation__Heading__Actions__RegisterAllClubs"
        sxDisplay={{ xs: 'flex', sm: 'none' }}
        onClick={onActionSelected(
          PROJECT_PRESENTATION_SUPPORTED_ACTIONS.REGISTER_ALL_CLUBS
        )}
      >
        <ConfirmationNumberIcon fontSize="small" />
      </CircleLoadingButton>
    </React.Fragment>
  );

  const editButtons = (
    <React.Fragment key="editButtons">
      <Tooltip title={t('project-presentations.actions.edit.tooltip')}>
        <LoadingButton
          className="ProjectPresentation__Heading__Actions__Edit"
          variant="contained"
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={onActionSelected(
            PROJECT_PRESENTATION_SUPPORTED_ACTIONS.EDIT
          )}
        >
          <EditIcon />
        </LoadingButton>
      </Tooltip>
      <CircleLoadingButton
        className="ProjectPresentation__Heading__Actions__Edit"
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
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.REGISTER_ALL_CLUBS]:
      registerAllClubsButtons,
    [PROJECT_PRESENTATION_SUPPORTED_ACTIONS.WITHDRAW_INTEREST]:
      withdrawInterestButtons,
  };

  return Object.keys(actions).length ? (
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
