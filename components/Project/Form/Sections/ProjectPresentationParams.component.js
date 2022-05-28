import PropTypes from 'prop-types';
import React from 'react';
import { TextField, Box, Grid, Typography } from '@mui/material';
import TagsInput from '../../../common/TagsInput';
import { PROJECT_PRESENTATION_PARAMS_FIELDS as PRESENTATION_PARAMS_FIELDS } from '../ProjectForm.properties';

const MOBILE_DESCRIPTION =
  'Make the project easily discoverable for thos in tune with your idea...';

const FULL_DESCRIPTION =
  'These will help make the project easily discoverable by those in tune with your idea...';

const ProjectPresentationParams = ({
  formData,
  onFormChange,
  withDescription,
  isNotMobile,
  onInputKeyPressed,
}) => {
  return (
    <div className="ProjectPresentationParams ProjectPresentationParams__Container ProjectForm__Section__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectPresentationParams__Description">
          <Typography>
            {isNotMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION}
          </Typography>
        </Box>
      )}
      <Grid
        className="ProjectForm__Section__Fields ProjectPresentationParams__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={5}>
          <TextField
            {...PRESENTATION_PARAMS_FIELDS.location}
            value={formData['presentation.params.location'] || ''}
            onChange={onFormChange('presentation.params.location')}
            fullWidth
            onKeyPress={onInputKeyPressed}
          />
        </Grid>
        <Grid item xs={5}>
          <TagsInput
            {...PRESENTATION_PARAMS_FIELDS.technologies}
            selectedTags={onFormChange('presentation.params.skills')}
            id="tags"
            name="tags"
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

ProjectPresentationParams.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
  onInputKeyPressed: (e) => {
    e.key === 'Enter' && e.preventDefault();
  },
};

ProjectPresentationParams.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
  onInputKeyPressed: PropTypes.func,
};

export default ProjectPresentationParams;
