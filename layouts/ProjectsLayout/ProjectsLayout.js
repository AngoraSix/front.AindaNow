import PropTypes from 'prop-types';
import React from 'react';
import DefaultLayout from '../DefaultLayout';

const ProjectsLayout = ({ children }) => {
  let headData = {};

  return (
    <DefaultLayout
      className="ProjectsLayout__Page"
      headData={headData}
      contained={false}
    >
      {children}
    </DefaultLayout>
  );
};

ProjectsLayout.defaultProps = {};

ProjectsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProjectsLayout;
