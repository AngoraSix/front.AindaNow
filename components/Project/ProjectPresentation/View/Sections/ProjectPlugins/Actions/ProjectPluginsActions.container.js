import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useEffect, useReducer, useState } from 'react';
import api from '../../../../../../../api';
import { useLoading, useNotifications } from '../../../../../../../hooks/app';
import { useActiveSession } from '../../../../../../../hooks/oauth';
import logger from '../../../../../../../utils/logger';
import { processHateoasActions } from '../../../../../../../utils/rest/hateoas/hateoasUtils';
import ProjectPluginsActions from './ProjectPluginsActions.component';
import ProjectPluginsActionsReducer, {
  INITIAL_STATE,
  updateFieldAction,
  updateManagementActions,
} from './ProjectPluginsActions.reducer';

const ProjectPluginsActionsContainer = ({ projectPresentation, isAdmin }) => {
  const { t } = useTranslation('project-presentations.view');
  const { doLoad } = useLoading();
  const { onError, onSuccess } = useNotifications();
  const { session } = useActiveSession(true);
  const [isLoading, setIsLoading] = useState(true);
  const activeSession = session && !session.error;
  const [projectPluginsActionData, dispatch] = useReducer(
    ProjectPluginsActionsReducer,
    {
      ...INITIAL_STATE,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      doLoad(true);
      setIsLoading(true);
      try {
        await Promise.all([_processManagementResponse()]);
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

  const processManagementData = (managementResponse) => {
    return {
      constitution: managementResponse.constitution,
      id: managementResponse.id,
      projectId: managementResponse.projectId,
      status: managementResponse.status,
    };
  };

  const _processManagementResponse = async () => {
    const managementResponse = await api.front.getProjectManagement(
      projectPresentation.projectId
    );
    console.log(managementResponse);
    const managementData = processManagementData(managementResponse);
    console.log(managementData);
    const managementActions = processHateoasActions(managementResponse);
    dispatch(updateManagementActions(managementActions));
  };

  const onCreateManagement = async () => {
    doLoad(true);
    setIsLoading(true);

    try {
      const managementResponse = await api.front.createProjectManagementById(
        projectPresentation.projectId
      );
      const managementActions = processHateoasActions(managementResponse);
      dispatch(updateManagementActions(managementActions));
      onSuccess(
        t(
          'project-presentations.actions.create-project-management.notifications.success.created'
        )
      );
    } catch (ex) {
      onError(
        `Error creating management project for Prbject - ${
          ex.response?.data?.message || ex.message
        }`
      );
    } finally {
      doLoad(false);
      setIsLoading(false);
    }
  };

  const onGetManagement = async () => {
    // todo: get project management
    console.log('get project management');
  };

  const onUpdateManagement = async () => {
    // todo: update project management
    console.log('update project management');
  };

  return (
    <ProjectPluginsActions
      projectPresentation={projectPresentation}
      actions={{
        ...projectPluginsActionData.managementActions,
      }}
      onActionDataChange={onFormChange}
      onCreateManagement={onCreateManagement}
      onUpdateManagement={onUpdateManagement}
      onGetManagement={onGetManagement}
      actionFormData={projectPluginsActionData.actionData}
      isAdmin={isAdmin}
      isLoading={isLoading}
    />
  );
};

ProjectPluginsActionsContainer.defaultProps = {
  isAdmin: false,
};

ProjectPluginsActionsContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default ProjectPluginsActionsContainer;
