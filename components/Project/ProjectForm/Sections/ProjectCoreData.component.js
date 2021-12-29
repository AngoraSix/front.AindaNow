import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Box, Typography } from '@mui/material';
import { PROJECT_CORE_FORM_PROPS as CORE_PROPS } from '../ProjectForm.properties';

const DESCRIPTION =
  "Let's start by simply naming the new Project youll be working on...";

const ProjectCoreData = ({ formData, onFormChange, withDescription }) => {
  return (
    <div className="ProjectCoreData ProjectCoreData__Container ProjectForm__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectCoreData__Description">
          <Typography>{DESCRIPTION}</Typography>
        </Box>
      )}
      <Grid
        className="ProjectForm__Fields ProjectCoreData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10}>
          <TextField
            {...CORE_PROPS.name}
            value={formData.name}
            onChange={onFormChange('name')}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

ProjectCoreData.defaultProps = {
  formData: {},
  withDescription: false,
};

ProjectCoreData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
};

export default ProjectCoreData;
