import PropTypes from 'prop-types';
import ProjectPresentationView from './ProjectPresentationView.component';

const ProjectPresentationViewContainer = ({ projectPresentation, isAdmin }) => {
  return (
    <ProjectPresentationView
      projectPresentation={projectPresentation}
      isAdmin={isAdmin}
    />
  );
};

ProjectPresentationViewContainer.defaultProps = {
  isAdmin: false,
};

ProjectPresentationViewContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default ProjectPresentationViewContainer;
