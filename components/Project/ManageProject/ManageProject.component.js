import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import ProjectForm from '../ProjectForm';

const ManageProject = ({ project, stepped, ...args }) => {
  return (
    <Box className="ManageProject ManageProject__Container">
      <Typography variant="h6" color="primary">
        {project ? 'Edit Project' : 'New Project'}
      </Typography>

      <ProjectForm stepped={stepped} project={project} {...args} />
    </Box>
  );
};

ManageProject.defaultProps = {
  stepped: true,
};

ManageProject.propTypes = {
  project: PropTypes.object,
  stepped: PropTypes.bool,
};

export default ManageProject;
