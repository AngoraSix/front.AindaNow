import React from 'react';
import PropTypes from 'prop-types';
import ProjectViewSection from './Sections/ProjectViewSection.component';

const ProjectView = ({ project }) => {
  return (
    <div className="ProjectView ProjectView__Container">
      <ProjectViewSection project={project} />
    </div>
  );
};

ProjectView.defaultProps = {};

ProjectView.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectView;
