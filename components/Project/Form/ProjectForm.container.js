import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../api';
import { resolveRoute, ROUTES } from '../../../constants';
import { useLoading } from '../../../hooks/app';
import {
  formToProject,
  projectToForm,
} from '../../../utils/converters/projectConverters';
import logger from '../../../utils/logger';
import ProjectForm from './ProjectForm.component';
import { PROJECT_PRESENTATION_REQUIRED_FIELDS } from './ProjectForm.properties';
import ProjectFormReducer, {
  INITIAL_STATE,
  updateFieldsAction,
} from './ProjectForm.reducer';

const ProjectFormContainer = ({ project, onDone, onError, ...args }) => {
  const { doLoad } = useLoading();
  const router = useRouter();
  const [formData, dispatch] = useReducer(ProjectFormReducer, {
    ...INITIAL_STATE,
    ...projectToForm(project),
  });

  const onFormChange = (property) => (eventOrValue) => {
    const partialFormData = {
      [property]: eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue,
    };

    dispatch(updateFieldsAction(partialFormData));
  };

  const onSubmit = async (flatFormData) => {
    doLoad(true);
    try {
      let projectObject = await formToProject(
        flatFormData,
        PROJECT_PRESENTATION_REQUIRED_FIELDS
      );

      const projectResponse = await api.front.newProject(projectObject);
      onDone(projectResponse);

      const viewURL = resolveRoute(
        ROUTES.projects.presentations.view,
        projectResponse.presentation.id
      );
      router.push(viewURL);
    } catch (err) {
      logger.error(err);
      onError(err);
    }

    doLoad(false);
  };

  return (
    <ProjectForm
      formData={formData}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      {...args}
    />
  );
};

ProjectFormContainer.defaultProps = {
  project: {},
  onDone: () => {},
  onError: () => {},
};

ProjectFormContainer.propTypes = {
  project: PropTypes.object,
  props: PropTypes.object,
  onDone: PropTypes.func,
  onError: PropTypes.func,
};

export default ProjectFormContainer;
