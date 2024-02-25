import { Box, Paper, Typography } from '@mui/material';
import ProjectPluginsActions from './Actions';

const ProjectPlugins = ({
  projectPresentation,
  managementData,
  isAdmin,
  isLoading,
}) => {
  if (!managementData.constitution) {
    return (
      <Box className="ProjectPlugins__Container">
        <Paper>
          <Box className="ProjectPresentation__SectionsPresentation">
            <Box className="ProjectPlugins__Body">
              <Typography
                className="ProjectPlugins__Heading__Name"
                variant="h5"
                component="h1"
                color="primary.main"
              >
                Management
              </Typography>
              <Typography variant="body1" component="p">
                {isLoading
                  ? 'Loading management data...'
                  : 'No management data available.'}
              </Typography>

              <Typography variant="h6" component="h1" color="primary.main">
                Actions
              </Typography>
              <ProjectPluginsActions
                projectPresentation={projectPresentation}
                isAdmin={isAdmin}
                managementActions={managementData.actions}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="ProjectPlugins__Container">
      <Paper>
        <Box className="ProjectPresentation__SectionsPresentation">
          <Box className="ProjectPlugins__Body">
            <Typography
              className="ProjectPlugins__Heading__Name"
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
              managementActions={managementData.actions}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjectPlugins;
