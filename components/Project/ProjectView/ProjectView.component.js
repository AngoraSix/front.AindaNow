import PropTypes from 'prop-types';
import React from 'react';
import MediaHeader from './Sections/MediaHeader';
import ProjectPresentation from './Sections/ProjectPresentation/ProjectPresentation.component';

const ProjectView = ({ project }) => {
  return (
    <div className="ProjectView ProjectView__Container">
      <MediaHeader media={project.sections.flatMap((s) => s.media)} />
      <ProjectPresentation project={project} />
    </div>
  );
};

ProjectView.defaultProps = {};

ProjectView.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectView;
