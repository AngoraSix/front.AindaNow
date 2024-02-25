import { Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import MediaHeader from './Sections/MediaHeader';
import ProjectPresentation from './Sections/ProjectPresentation/ProjectPresentation.component';
import ProjectPlugins from './Sections/ProjectPlugins/ProjectPlugins.component';

import { useEffect, useRef } from 'react';

const ProjectPresentationView = ({
  projectPresentation,
  projectPresentationActions,
  isAdmin,
}) => {
  const presentationRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      presentationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  }, []);

  return (
    <Box className="ProjectPresentationView ProjectPresentationView__Container">
      <MediaHeader
        media={projectPresentation.sections?.flatMap((s) => s.media)}
      />

      <Box className="ProjectPresentation ProjectPresentation__Container">
        <Box
          ref={presentationRef}
          className="ProjectPresentation__AreaExtension"
        />
        <Paper className="ProjectPresentation__MainSection">
          <Box className="ProjectPresentationView__BodyContainer">
            <ProjectPlugins
              projectPresentation={projectPresentation}
              isAdmin={isAdmin}
            />
            <ProjectPresentation
              projectPresentation={projectPresentation}
              isAdmin={isAdmin}
              projectPresentationActions={projectPresentationActions}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

ProjectPresentationView.defaultProps = {
  isAdmin: false,
  projectPresentationActions: {},
};

ProjectPresentationView.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  projectPresentationActions: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export default ProjectPresentationView;
