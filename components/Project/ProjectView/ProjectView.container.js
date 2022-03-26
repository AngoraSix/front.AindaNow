import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import Profile from './Profile.component';
import api from '../../../api';
import { useLoading, useNotifications } from '../../../hooks/app';
import ProfileReducer, {
  INITIAL_STATE,
  updateAttributesAction,
} from './Profile.reducer';
import { PROFILE_ATTRIBUTES } from '../../../constants';
import logger from '../../../utils/logger';

const ProjectViewContainer = ({ project }) => {
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();

  return <ProjectView project={project} />;
};

ProjectViewContainer.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectViewContainer;
