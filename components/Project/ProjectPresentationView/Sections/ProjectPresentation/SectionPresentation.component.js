import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import MediaPreview from '../../../../common/Media/Previews';

const SectionPresentation = ({ sectionTitle, description, mainMedia }) => {
  return (
    <Box className="SectionPresentation SectionPresentation__Container">
      <Typography
        className="SectionPresentation__Title"
        variant="h4"
        component="h2"
        color="primary.main"
      >
        {sectionTitle}
      </Typography>
      <Box className="SectionPresentation__MainMedia">
        <MediaPreview mediaType={mainMedia.mediaType} media={mainMedia} />
      </Box>
      {description && (
        <Typography
          className="SectionPresentation__Description"
          variant="body1"
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

SectionPresentation.defaultProps = {
  profileAttributes: {},
};

SectionPresentation.propTypes = {
  sectionTitle: PropTypes.string,
  description: PropTypes.string,
  mainMedia: PropTypes.object.isRequired,
};

export default SectionPresentation;
