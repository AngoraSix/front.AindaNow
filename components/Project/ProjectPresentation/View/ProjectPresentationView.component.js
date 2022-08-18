import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import MediaHeader from './Sections/MediaHeader';
import ProjectPresentation from './Sections/ProjectPresentation/ProjectPresentation.component';

const ProjectPresentationView = ({
  projectPresentation,
  projectPresentationActions,
  isAdmin,
}) => {
  return (
    <Box className="ProjectPresentationView ProjectPresentationView__Container">
      <MediaHeader
        media={projectPresentation.sections?.flatMap((s) => s.media)}
      />
      <ProjectPresentation
        projectPresentation={projectPresentation}
        isAdmin={isAdmin}
        projectPresentationActions={projectPresentationActions}
      />
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
