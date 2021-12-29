import React from 'react';
import NewProject from './NewProject.component';
import { useNotifications } from '../../../hooks/app';

const NewProjectContainer = () => {
  const { onSuccess, onError: onNotificationError } = useNotifications();

  const onDone = () => {
    onSuccess('Project creted successfully.');
  };

  const onError = () => {
    onNotificationError('Error creating project.');
  };

  return <NewProject onDone={onDone} onError={onError} />;
};

NewProjectContainer.propTypes = {};

export default NewProjectContainer;
