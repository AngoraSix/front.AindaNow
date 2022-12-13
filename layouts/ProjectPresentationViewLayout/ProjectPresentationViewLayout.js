import PropTypes from 'prop-types';
import React from 'react';
import DefaultLayout from '../DefaultLayout';

const ProjectPresentationViewLayout = ({ children, headData }) => {
  return (
    <DefaultLayout
      className="ProjectPresentationViewLayout__Page"
      headData={headData}
      contained={false}
    >
      {children}
    </DefaultLayout>
  );
};

ProjectPresentationViewLayout.defaultProps = {
  headData: {},
};

ProjectPresentationViewLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ProjectPresentationViewLayout;
