import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import api from '../../../../../../api';
import config from '../../../../../../config';
import { useLoading, useNotifications } from '../../../../../../hooks/app';
import { useActiveSession } from '../../../../../../hooks/oauth';
import { resolveRoute } from '../../../../../../utils/api/apiHelper';
import logger from '../../../../../../utils/logger';
import { processHateoasActions } from '../../../../../../utils/rest/hateoas/hateoasUtils';
import ProjectPlugins from './ProjectPlugins.component';

const ProjectPluginsContainer = ({ projectPresentation, isAdmin }) => {
  const { t } = useTranslation('project-presentations.view');
  const { doLoad } = useLoading();
  const { session } = useActiveSession(true);
  const activeSession = session && !session.error;
  const [isLoading, setIsLoading] = useState(true);
  const { onError, onSuccess } = useNotifications();

  const [pluginData, setPluginData] = useState({
    management: {
      data: {},
      actions: {},
    },
  });

  const processManagementResponse = (response) => {
    const managementActions = processHateoasActions(response);

    const management = {
      data: {
        constitution: response.constitution,
        status: response.status,
        id: response.id,
        projectId: response.projectId,
      },
      actions: managementActions,
    };

    setPluginData((prev) => {
      prev.management = management;
      return prev;
    });
  };

  const fetchManagement = async () => {
    const managementResponse = await api.front.getProjectManagement(
      projectPresentation.projectId
    );
    processManagementResponse(managementResponse);
  };

  useEffect(() => {
    const fetchData = async () => {
      doLoad(true);
      setIsLoading(true);

      try {
        await Promise.all([fetchManagement()]);
      } catch (err) {
        if (err.response?.status !== 404 && activeSession) {
          logger.error(
            `Error retrieving management - ${err.response?.data?.message || err.message
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

  const onCreateManagement = async () => {
    window.open(
      `${resolveRoute(
        `${config.thirdPartiesConfig.angorasix.host}${config.thirdPartiesConfig.angorasix.NoewProjectManagementForProjectPath}`,
        projectPresentation.projectId
      )}`
    );
  };

  const onUpdateManagement = async () => {
    // todo: update project management
    console.log('update project management');
  };

  const onGoToManagement = async () => {
    window.open(
      `${resolveRoute(
        `${config.thirdPartiesConfig.angorasix.host}${config.thirdPartiesConfig.angorasix.viewProjectManagementPath}`,
        pluginData.management.data.id
      )}`
    );
  };

  return (
    <ProjectPlugins
      projectPresentation={projectPresentation}
      isAdmin={isAdmin}
      pluginData={pluginData}
      onUpdateManagement={onUpdateManagement}
      onCreateManagement={onCreateManagement}
      onGoToManagement={onGoToManagement}
      isLoading={isLoading}
    />
  );
};

ProjectPluginsContainer.defaultProps = {
  isAdmin: false,
};

ProjectPluginsContainer.propTypes = {
  isAdmin: PropTypes.bool,
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectPluginsContainer;
