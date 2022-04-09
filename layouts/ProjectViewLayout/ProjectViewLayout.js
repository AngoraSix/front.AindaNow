import PropTypes from 'prop-types';
import React from 'react';
import DefaultLayout from '../DefaultLayout';

const ProjectViewLayout = ({ children }) => {
  let headData = {};

  return (
    <DefaultLayout
      className="ProjectViewLayout__Page"
      headData={headData}
      contained={false}
    >
      {children}
    </DefaultLayout>
  );
};

ProjectViewLayout.defaultProps = {};

ProjectViewLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProjectViewLayout;
