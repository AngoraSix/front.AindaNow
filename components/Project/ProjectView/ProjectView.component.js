import PropTypes from 'prop-types';
import React from 'react';
import MediaHeader from './Sections/MediaHeader';
import ProjectPresentation from './Sections/ProjectPresentation';

const ProjectView = ({ project }) => {
  return (
    <div className="ProjectView ProjectView__Container">
      <MediaHeader media={project.sections[0].media} />
      {/* <ProjectPresentation project={project} /> */}
    </div>
  );
};

ProjectView.defaultProps = {};

ProjectView.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectView;
