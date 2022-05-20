import PropTypes from 'prop-types';
import React from 'react';
import ManageProject from './ManageProject.component';

const ManageProjectContainer = ({ project, stepped }) => {


  return (
    <ManageProject
      project={project}
      stepped={stepped}
    />
  );
};

ManageProjectContainer.defaultProps = {
  stepped: true,
};

ManageProjectContainer.propTypes = {
  project: PropTypes.object,
  stepped: PropTypes.bool,
};

export default ManageProjectContainer;
