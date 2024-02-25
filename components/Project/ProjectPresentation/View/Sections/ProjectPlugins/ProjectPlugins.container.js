import api from '../../../../../../api';
import { useState, useEffect } from 'react';
import { processHateoasActions } from '../../../../../../utils/rest/hateoas/hateoasUtils';
import { useLoading } from '../../../../../../hooks/app';
import { useActiveSession } from '../../../../../../hooks/oauth';
import logger from '../../../../../../utils/logger';
import ProjectPlugins from './ProjectPlugins.component';

const ProjectPluginsContainer = ({ projectPresentation, isAdmin }) => {
  const [managementData, setManagementData] = useState({});

  const { doLoad } = useLoading();
  const { session } = useActiveSession(true);
  const [isLoading, setIsLoading] = useState(true);
  const activeSession = session && !session.error;

  useEffect(() => {
    const fetchData = async () => {
      doLoad(true);
      setIsLoading(true);
      try {
        await Promise.all([_processManagementResponse()]);
      } catch (err) {
        if (err.response?.status !== 404 && activeSession) {
          logger.error(
            `Error retrieving management - ${
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

  const _processManagementResponse = async () => {
    const managementResponse = await api.front.getProjectManagement(
      projectPresentation.projectId
    );
    const managementActions = processHateoasActions(managementResponse);
    const data = {
      constitution: managementResponse.constitution,
      status: managementResponse.status,
      id: managementResponse.id,
      projectId: managementResponse.projectId,
      actions: managementActions,
    };
    setManagementData(data);
  };

  return (
    <ProjectPlugins
      projectPresentation={projectPresentation}
      isAdmin={isAdmin}
      managementData={managementData}
      isLoading={isLoading}
    />
  );
};

export default ProjectPluginsContainer;
