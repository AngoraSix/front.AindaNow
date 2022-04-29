import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import MediaHeader from './Sections/MediaHeader';
import ProjectPresentation from './Sections/ProjectPresentation/ProjectPresentation.component';

const ProjectPresentationView = ({ projectPresentation }) => {
  return (
    <Box className="ProjectPresentationView ProjectPresentationView__Container">
      <MediaHeader
        media={projectPresentation.sections.flatMap((s) => s.media)}
      />
      <ProjectPresentation projectPresentation={projectPresentation} />
    </Box>
  );
};

ProjectPresentationView.defaultProps = {};

ProjectPresentationView.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectPresentationView;
