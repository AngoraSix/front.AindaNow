import PropTypes from 'prop-types';
import ProjectPresentationView from './ProjectPresentationView.component';

const ProjectPresentationViewContainer = ({ projectPresentation, projectPresentationActions, isAdmin }) => {
  return (
    <ProjectPresentationView
      projectPresentation={projectPresentation}
      isAdmin={isAdmin}
      projectPresentationActions={projectPresentationActions}
    />
  );
};

ProjectPresentationViewContainer.defaultProps = {
  isAdmin: false,
  projectPresentationActions: {}
};

ProjectPresentationViewContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  projectPresentationActions: PropTypes.object
};

export default ProjectPresentationViewContainer;
