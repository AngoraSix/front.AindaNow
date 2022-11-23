import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import ProjectForm from '../Form';

const ManageProject = ({ project, stepped, ...args }) => {
  const { t } = useTranslation('projects.edit');

  return (
    <Box className="ManageProject ManageProject__Container">
      <Typography variant="h6" color="primary">
        {project ? t('projects.edit.title.edit') : t('projects.edit.title.new')}
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
