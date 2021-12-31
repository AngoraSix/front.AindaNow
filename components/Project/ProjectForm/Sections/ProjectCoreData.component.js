import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Box, Typography } from '@mui/material';
import { PROJECT_CORE_FORM_FIELDS as CORE_FIELDS } from '../ProjectForm.properties';

const MOBILE_DESCRIPTION =
  "Let's start by giving a name to that idea of yours...";

const FULL_DESCRIPTION =
  "It's time to start giving shape to that idea you have. Let's first define a name for it...";

const ProjectCoreData = ({
  formData,
  onFormChange,
  withDescription,
  isNotMobile,
  setIsCompleted,
  wasSubmitted,
  onInputKeyPressed,
}) => {
  const onFieldChange = (property) => (event) => {
    let {
      target: { value },
    } = event;

    // we only have one field in this section
    value ? setIsCompleted(true) : setIsCompleted(false);
    onFormChange(property)(event);
  };

  return (
    <div className="ProjectCoreData ProjectCoreData__Container ProjectForm__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectCoreData__Description">
          <Typography>
            {isNotMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION}
          </Typography>
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
            {...CORE_FIELDS.name}
            value={formData.name || ''}
            onChange={onFieldChange('name')}
            fullWidth
            error={wasSubmitted && CORE_FIELDS.name.required && !formData.name}
            onKeyPress={onInputKeyPressed}
          />
        </Grid>
      </Grid>
    </div>
  );
};

ProjectCoreData.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
  setIsCompleted: () => {},
  onInputKeyPressed: (e) => {
    e.key === 'Enter' && e.preventDefault();
  },
};

ProjectCoreData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
  wasSubmitted: PropTypes.bool,
  setIsCompleted: PropTypes.func,
  onInputKeyPressed: PropTypes.func,
};

export default ProjectCoreData;
