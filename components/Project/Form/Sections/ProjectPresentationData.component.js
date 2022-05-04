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
  setIsCompleted,
  wasSubmitted,
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
    <Box className="ProjectPresentationData ProjectPresentationData__Container ProjectForm__Section__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectPresentationData__Description">
          <Typography>
            {isNotMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION}
          </Typography>
        </Box>
      )}
      <Grid
        className="ProjectForm__Section__Fields ProjectPresentationData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10}>
          <TextField
            {...PRESENTATION_BASE_FIELDS.description}
            value={formData['presentation.description'] || ''}
            onChange={onFieldChange('presentation.description')}
            error={
              wasSubmitted &&
              PRESENTATION_BASE_FIELDS.description.required &&
              !formData.description
            }
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

ProjectPresentationData.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
  setIsCompleted: () => {},
  wasSubmitted: false,
};

ProjectPresentationData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
  setIsCompleted: PropTypes.func,
  wasSubmitted: PropTypes.bool,
};

export default ProjectPresentationData;
