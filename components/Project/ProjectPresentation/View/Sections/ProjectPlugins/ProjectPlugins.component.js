import { Box, Paper, Typography } from '@mui/material';
import ProjectPluginsActions from './Actions';

const ProjectPlugins = ({
  projectPresentation,
  pluginData,
  onUpdateManagement,
  onCreateManagement,
  onGetManagement,
  isAdmin,
  isLoading,
}) => {
  const { management } = pluginData;

  const availableData = management?.data?.constitution && !isLoading;

  const getBody = () => {
    if (availableData) {
      return (
        <Box>
          <Typography variant="body1" component="p">
            This project is currently on {management?.data?.status} status.
          </Typography>

          <Typography variant="body1" component="p">
            Bylaws:
          </Typography>
          <ol>
            {management?.data?.constitution?.bylaws?.map((bylaw, i) => (
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
        </Box>
      );
    } else if (isLoading) {
      return (
        <Box>
          <Typography variant="body1" component="p">
            loading ...
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography variant="body1" component="p">
            No management data available
          </Typography>
        </Box>
      );
    }
  };

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

            {getBody()}

            <ProjectPluginsActions
              projectPresentation={projectPresentation}
              actions={{
                ...management?.actions,
              }}
              onActionDataChange={() => {}}
              onCreateManagement={onCreateManagement}
              onUpdateManagement={onUpdateManagement}
              onGetManagement={onGetManagement}
              actionFormData={{}}
              isAdmin={isAdmin}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjectPlugins;
