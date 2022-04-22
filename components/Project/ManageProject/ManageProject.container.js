import PropTypes from 'prop-types';
import React from 'react';
import { useNotifications } from '../../../hooks/app';
import ManageProject from './ManageProject.component';

const ManageProjectContainer = ({ project, stepped }) => {
  const { onSuccess, onError: onNotificationError } = useNotifications();

  const onDone = () => {
    onSuccess('Project creted successfully.');
  };

  const onError = () => {
    onNotificationError('Error creating project.');
  };

  return (
    <ManageProject
      project={project}
      stepped={stepped}
      onDone={onDone}
      onError={onError}
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
