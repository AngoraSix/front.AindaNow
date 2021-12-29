import React from 'react';
import ProjectForm from '../ProjectForm';
import { Typography } from '@mui/material';

const NewProject = (props) => (
  <div className="NewProject NewProject__Container">
    <Typography variant="h6" color="primary">
      New Project
    </Typography>

    <ProjectForm stepped {...props} />
  </div>
);

export default NewProject;
