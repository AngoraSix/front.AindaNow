import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import MediaList from '../../../common/Media/MediaList.component';
import { PROJECT_PRESENTATION_BASE_FORM_FIELDS as PRESENTATION_BASE_FIELDS } from '../ProjectForm.properties';

const MOBILE_DESCRIPTION = 'Time to add some visual aids...';

const FULL_DESCRIPTION =
  'Media will help explain the purpose of the project in an appealing manner...';

const ProjectPresentationMedia = ({
  formData,
  onFormChange,
  withDescription,
  isNotMobile,
}) => {
  return (
    <div className="ProjectPresentationMedia ProjectPresentationMedia__Container ProjectForm__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectPresentationMedia__Description">
          <Typography>
            {isNotMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION}
          </Typography>
        </Box>
      )}
      <Grid
        className="ProjectForm__Fields ProjectPresentationMedia__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10}>
          <Typography>{PRESENTATION_BASE_FIELDS.media.label}</Typography>
          <MediaList formData={formData} onFormChange={onFormChange} />
        </Grid>
      </Grid>
    </div>
  );
};

ProjectPresentationMedia.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
};

ProjectPresentationMedia.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
};

export default ProjectPresentationMedia;
