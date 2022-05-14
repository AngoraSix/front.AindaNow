import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import PresentationSectionMediaData from '../../ProjectPresentation/Form/Sections/PresentationSectionMediaData.component';

const MOBILE_DESCRIPTION = 'Time to add some visual aids...';

const FULL_DESCRIPTION =
  'Media will help explain the purpose of the project in an appealing manner...';

const ProjectPresentationMedia = ({
  formData,
  onFormChange,
  withDescription,
  isNotMobile,
  setIsCompleted,
  wasSubmitted,
}) => {
  return (
    <Box className="ProjectPresentationMedia ProjectPresentationMedia__Container ProjectForm__Section__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectPresentationMedia__Description">
          <Typography>
            {isNotMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION}
          </Typography>
        </Box>
      )}
      <PresentationSectionMediaData
        sectionsFormData={formData['presentations.sections']}
        onSectionsChange={onFormChange('presentations.sections')}
        setIsCompleted={setIsCompleted}
        wasSubmitted={wasSubmitted}
        presentationIndex={0}
      />
    </Box>
  );
};

ProjectPresentationMedia.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
  setIsCompleted: () => {},
  wasSubmitted: false,
};

ProjectPresentationMedia.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
  setIsCompleted: PropTypes.func,
  wasSubmitted: PropTypes.bool,
};

export default ProjectPresentationMedia;
