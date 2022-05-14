import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../api';
import { resolveRoute, ROUTES } from '../../../constants';
import { useLoading } from '../../../hooks/app';
import Project from '../../../models/Project';
import { toType } from '../../../utils/helpers';
import logger from '../../../utils/logger';
import { uploadAllMedia } from '../../../utils/media/mediaProcessor';
import ProjectForm from './ProjectForm.component';
import ProjectFormReducer, {
  INITIAL_STATE,
  updateFieldsAction,
} from './ProjectForm.reducer';

const ProjectFormContainer = ({ project, onDone, onError, ...args }) => {
  const { doLoad } = useLoading();
  const router = useRouter();
  const [formData, dispatch] = useReducer(ProjectFormReducer, {
    ...INITIAL_STATE,
    ...toType(project, Project).toFormData(),
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
      let project = Project.fromFormData(flatFormData);
      console.log('OOOOOOO');
      console.log(project);
      project = await uploadAllMedia(project);
      project.completeRequiredFields();

      console.log(project);
      const projectResponse = await api.front.newProject(project);

      onDone(projectResponse);

      const viewURL = resolveRoute(
        ROUTES.projects.presentations.view,
        projectResponse.id,
        projectResponse.presentations.id
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
