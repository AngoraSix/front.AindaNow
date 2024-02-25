import { Box, Paper } from '@mui/material';

/*
    Show plugin/management data, show possible actions.
    Different for project admin and normal user
    Different if project has management 
*/

const ProjectPlugins = ({ projectPresentation, isAdmin }) => {
  return (
    <Box className="ProjectPlugins__Container">
      <Paper>Plugins</Paper>
    </Box>
  );
};

export default ProjectPlugins;
