import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import MediaHeader from './Sections/MediaHeader';
import ProjectPresentation from './Sections/ProjectPresentation/ProjectPresentation.component';

const ProjectPresentationView = ({ projectPresentation, isAdmin }) => {
  return (
    <Box className="ProjectPresentationView ProjectPresentationView__Container">
      <MediaHeader
        media={projectPresentation.sections?.flatMap((s) => s.media)}
      />
      <ProjectPresentation
        projectPresentation={projectPresentation}
        isAdmin={isAdmin}
      />
    </Box>
  );
};

ProjectPresentationView.defaultProps = { isAdmin: false };

ProjectPresentationView.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default ProjectPresentationView;
