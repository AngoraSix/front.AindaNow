import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import api from '../../../../../../../api';
import config from '../../../../../../../config';
import { CLUB_MEMBERSHIP_OPERATIONS } from '../../../../../../../constants';
import { useLoading, useNotifications } from '../../../../../../../hooks/app';
import { hateoasFormToActions } from '../../../../../../../utils/rest/hateoas/hateoasResponseToActions';
import ProjectPresentationActions from './ProjectPresentationActions.component';
import ProjectPresentationActionsReducer, {
  INITIAL_STATE,
  updateClubActions,
  updateFieldAction,
} from './ProjectPresentationActions.reducer';

const ProjectPresentationActionsContainer = ({
  projectPresentation,
  projectPresentationActions,
  isAdmin,
}) => {
  const { doLoad } = useLoading();
  const { onError, onSuccess } = useNotifications();
  const [projectPresentationActionData, dispatch] = useReducer(
    ProjectPresentationActionsReducer,
    {
      ...INITIAL_STATE,
      projectPresentationActions,
    }
  );

  useEffect(async () => {
    doLoad(true);
    try {
      let clubResponse = await api.front.getClub(
        projectPresentation.projectId,
        config.api.servicesAPIParams.clubsWellKnownContributorCandidatesType
      );
      const clubActions = hateoasFormToActions(clubResponse);
      dispatch(updateClubActions(clubActions));
    } catch (err) {
      if (err.response?.status !== 404) {
        onError(
          `Error retrieving supported actions - ${
            err.response?.data?.message || err.message
          }`
        );
      }
    } finally {
      doLoad(false);
    }
  }, []);

  const onFormChange = (property) => (eventOrValue) => {
    const partialFormData = {
      [property]: eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue,
    };

    dispatch(updateFieldAction(partialFormData));
  };

  const onShowInterest = async () => {
    modifyInterest(
      CLUB_MEMBERSHIP_OPERATIONS.JOIN,
      projectPresentationActionData.actionData
    );
  };

  const onWithdrawInterest = async () => {
    modifyInterest(CLUB_MEMBERSHIP_OPERATIONS.WITHDRAW);
  };

  const modifyInterest = async (operation, data = {}) => {
    doLoad(true);
    try {
      let clubResponse = await api.front.modifyClubMembership(
        projectPresentation.projectId,
        config.api.servicesAPIParams.clubsWellKnownContributorCandidatesType,
        operation,
        data
      );
      const clubActions = hateoasFormToActions(clubResponse);
      dispatch(updateClubActions(clubActions));
      onSuccess('Updated interest successfully');
    } catch (ex) {
      onError(
        `Error updating interest in Project - ${
          ex.response?.data?.message || ex.message
        }`
      );
    } finally {
      doLoad(false);
    }
  };

  return (
    <ProjectPresentationActions
      projectPresentation={projectPresentation}
      actions={{
        ...projectPresentationActionData.projectPresentationActions,
        ...projectPresentationActionData.clubActions,
      }}
      onShowInterest={onShowInterest}
      onWithdrawInterest={onWithdrawInterest}
      onActionDataChange={onFormChange}
      actionFormData={projectPresentationActionData.actionData}
      isAdmin={isAdmin}
    />
  );
};

ProjectPresentationActionsContainer.defaultProps = {
  isAdmin: false,
};

ProjectPresentationActionsContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default ProjectPresentationActionsContainer;
