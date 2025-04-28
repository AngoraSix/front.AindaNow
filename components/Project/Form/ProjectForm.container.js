import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../api';
import { ROUTES } from '../../../constants';
import { useLoading, useNotifications } from '../../../hooks/app';
import Project from '../../../models/Project';
import { resolveRoute } from '../../../utils/api/apiHelper';
import { toType } from '../../../utils/helpers';
import logger from '../../../utils/logger';
import { uploadAllMedia } from '../../../utils/media/mediaProcessor';
import ProjectForm from './ProjectForm.component';
import ProjectFormReducer, {
  INITIAL_STATE,
  updateFieldsAction,
} from './ProjectForm.reducer';

const ProjectFormContainer = ({ project, ...args }) => {
  const { t } = useTranslation('projects.edit');
  const { doLoad } = useLoading();
  const router = useRouter();
  const { onSuccess, onError } = useNotifications();
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

  const onSubmit = async () => {
    doLoad(true);
    try {
      let projectToSubmit = Project.fromFormData(formData);
      projectToSubmit = await uploadAllMedia(projectToSubmit);
      projectToSubmit.completeRequiredFields();

      const projectResponse = await api.front.saveProject(
        projectToSubmit,
        project?.id
      );
      
      onSuccess(t('projects.edit.form.notifications.success.saved'));

      if (!project?.id) {
        const viewURL = resolveRoute(
          ROUTES.projects.presentations.view,
          projectResponse.id,
          projectResponse.presentations[0].id
        );
        await router.push(viewURL);
      }
    } catch (err) {
      logger.error(err);
      onError('Error Saving Project');
    }

    doLoad(false);
  };

  return (
    <ProjectForm
      formData={formData}
      project={project}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      {...args}
    />
  );
};

ProjectFormContainer.defaultProps = {
  project: {},
};

ProjectFormContainer.propTypes = {
  project: PropTypes.object,
  props: PropTypes.object,
};

export default ProjectFormContainer;
