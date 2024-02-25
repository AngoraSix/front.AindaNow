import { Box, Paper } from '@mui/material';
import ProjectPluginsActions from './Actions';

const ProjectPlugins = ({
  projectPresentation,
  isAdmin,
}) => {
  return (
    <Box className="ProjectPlugins__Container">
      <Paper>Plugins</Paper>
      <ProjectPluginsActions
        projectPresentation={projectPresentation}
        isAdmin={isAdmin}
      />
    </Box>
  );
};

export default ProjectPlugins;
