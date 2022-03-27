import { Box, Grid, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { PROJECT_PRESENTATION_SECTION_BASE_FORM_FIELDS as PRESENTATION_BASE_FIELDS } from '../ProjectForm.properties';

const MOBILE_DESCRIPTION = "Now let's show what this is all about...";

const FULL_DESCRIPTION =
  "We need people to understand what this is all about, let's share all the information they need to know...";

const ProjectPresentationData = ({
  formData,
  onFormChange,
  withDescription,
  isNotMobile,
}) => {
  return (
    <div className="ProjectPresentationData ProjectPresentationData__Container ProjectForm__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectPresentationData__Description">
          <Typography>
            {isNotMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION}
          </Typography>
        </Box>
      )}
      <Grid
        className="ProjectForm__Fields ProjectPresentationData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10}>
          <TextField
            {...PRESENTATION_BASE_FIELDS.description}
            value={formData['presentation.description'] || ''}
            onChange={onFormChange('presentation.description')}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

ProjectPresentationData.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
};

ProjectPresentationData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
};

export default ProjectPresentationData;
