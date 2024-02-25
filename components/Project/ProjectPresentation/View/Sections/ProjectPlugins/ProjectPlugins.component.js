import { Box, Paper, Typography } from '@mui/material';
import ProjectPluginsActions from './Actions';
import api from '../../../../../../api';
import { useState, useEffect } from 'react';

const ProjectPlugins = ({ projectPresentation, isAdmin }) => {
  const [managementData, setManagementData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([_processManagementResponse()]);
      } catch (err) {
      } finally {
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _processManagementResponse = async () => {
    const managementResponse = await api.front.getProjectManagement(
      projectPresentation.projectId
    );
    if (managementResponse.constitution) {
      const data = {
        constitution: managementResponse.constitution,
        status: managementResponse.status,
        id: managementResponse.id,
        projectId: managementResponse.projectId,
      };
      setManagementData(data);
    }
  };

  return (
    <Box className="ProjectPlugins__Container">
      <Paper>
        <Box className="ProjectPresentation__Heading"></Box>
        <Box className="ProjectPresentation__SectionsPresentation">
          <Box className="ProjectPlugins__Body">
              <Typography
                className="ProjectPresentation__Heading__Name SectionPresentation__Project__Name"
                variant="h5"
                component="h1"
                color="primary.main"
              >
                Management
              </Typography>
              <Typography variant="body1" component="p">
                This project is currently on {managementData?.status} status.
              </Typography>

              <Typography variant="body1" component="p">
                Bylaws:
              </Typography>
              <ol>
                {managementData?.constitution?.bylaws?.map((bylaw, i) => (
                  <li key={i}>
                    <Typography variant="body1" component="p">
                      {bylaw?.scope}: {bylaw?.definition}
                    </Typography>
                  </li>
                ))}
              </ol>
              <Typography variant="h6" component="h1" color="primary.main">
                Actions
              </Typography>
              <ProjectPluginsActions
                projectPresentation={projectPresentation}
                isAdmin={isAdmin}
              />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjectPlugins;
