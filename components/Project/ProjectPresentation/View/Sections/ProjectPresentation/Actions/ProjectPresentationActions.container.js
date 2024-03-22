import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useEffect, useReducer, useState } from 'react';
import api from '../../../../../../../api';
import config from '../../../../../../../config';
import { CLUB_MEMBERSHIP_OPERATIONS } from '../../../../../../../constants';
import { useLoading, useNotifications } from '../../../../../../../hooks/app';
import { useActiveSession } from '../../../../../../../hooks/oauth';
import Club from '../../../../../../../models/Club';
import logger from '../../../../../../../utils/logger';
import {
  processHateoasActions,
  mapToHateoasCollectionDto,
} from '../../../../../../../utils/rest/hateoas/hateoasUtils';
import ProjectPresentationActions from './ProjectPresentationActions.component';
import { GENERAL_CLUBS_ACTIONS_KEY } from './ProjectPresentationActions.properties';
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
  const { t } = useTranslation('project-presentations.view');
  const { doLoad } = useLoading();
  const { onError, onSuccess } = useNotifications();
  const { session } = useActiveSession(true);
  const [isLoading, setIsLoading] = useState(true);
  const activeSession = session && !session.error;
  const [projectPresentationActionData, dispatch] = useReducer(
    ProjectPresentationActionsReducer,
    {
      ...INITIAL_STATE,
      projectPresentationActions,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      doLoad(true);
      setIsLoading(true);
      try {
        await Promise.all([_processAllClubsResponse()]);
      } catch (err) {
        if (err.response?.status !== 404 && activeSession) {
          logger.error(
            `Error retrieving supported actions - ${
              err.response?.data?.message || err.message
            }`
          );
        }
      } finally {
        doLoad(false);
        setIsLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSession, projectPresentation.projectId]);

  const onFormChange = (property) => (eventOrValue) => {
    const partialFormData = {
      [property]: eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue,
    };

    dispatch(updateFieldAction(partialFormData));
  };

  const _processAllClubsResponse = async () => {
    const allClubsResponse = await api.front.getAllProjectClubs(
      projectPresentation.projectId
    );
    const generalActions = processHateoasActions(allClubsResponse);
    const clubs = mapToHateoasCollectionDto(allClubsResponse, Club).collection;
    const clubActions = clubs.reduce((combinedActions, club) => {
      Object.assign(combinedActions, {
        [club.type]: club.actions,
      });
      return combinedActions;
    }, {});

    dispatch(
      updateClubActions({
        [GENERAL_CLUBS_ACTIONS_KEY]: generalActions,
        ...clubActions,
      })
    );
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
    setIsLoading(true);
    try {
      const clubResponse = await api.front.modifyClubMembership(
        projectPresentation.projectId,
        config.api.servicesAPIParams.clubsWellKnownContributorCandidatesType,
        operation,
        data
      );
      const club = new Club(clubResponse);
      dispatch(updateClubActions({ [club.type]: club.actions }));
      onSuccess(
        t(
          'project-presentations.actions.show-interest.notifications.success.registered'
        )
      );
    } catch (ex) {
      onError(
        `Error updating interest in Project - ${
          ex.response?.data?.message || ex.message
        }`
      );
    } finally {
      doLoad(false);
      setIsLoading(false);
    }
  };

  const onRegisterAllClubs = async () => {
    doLoad(true);
    setIsLoading(true);
    try {
      const allClubsResponse = await api.front.registerAllProjectClubs(
        projectPresentation.projectId
      );
      _processAllClubsResponse(allClubsResponse);
      onSuccess(
        t(
          'project-presentations.actions.register-all-clubs.notifications.success.registered'
        )
      );
    } catch (ex) {
      onError(
        `Error registering all well-known clubs - ${
          ex.response?.data?.message || ex.message
        }`
      );
    } finally {
      doLoad(false);
      setIsLoading(false);
    }
  };

  return (
    <ProjectPresentationActions
      projectPresentation={projectPresentation}
      actions={{
        ...projectPresentationActionData.projectPresentationActions,
        ..._flattenActions(projectPresentationActionData.clubActions),
      }}
      onShowInterest={onShowInterest}
      onWithdrawInterest={onWithdrawInterest}
      onActionDataChange={onFormChange}
      onRegisterAllClubs={onRegisterAllClubs}
      actionFormData={projectPresentationActionData.actionData}
      isAdmin={isAdmin}
      isLoading={isLoading}
    />
  );
};

const _flattenActions = (groupedActions) =>
  Object.entries(groupedActions).reduce(
    (combinedActions, [clubType, clubActions]) => {
      Object.assign(
        combinedActions,
        ...Object.entries(clubActions).map(([actionKey, action]) => ({
          [`${clubType}.${actionKey}`]: action,
        }))
      );
      return combinedActions;
    },
    {}
  );

ProjectPresentationActionsContainer.defaultProps = {
  isAdmin: false,
};

ProjectPresentationActionsContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default ProjectPresentationActionsContainer;
