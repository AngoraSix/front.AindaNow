import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import api from '../../../api';
import { useLoading } from '../../../hooks/app';
import logger from '../../../utils/logger';
import ProjectForm from './ProjectForm.component';
import { ROUTES, resolveRoute } from '../../../constants';
import { createObjectFromFlatParams } from '../../../utils/helpers';
import {PROJECT_PRESENTATION_REQUIRED_FIELDS} from './ProjectForm.properties';

const ProjectFormContainer = ({ project, onDone, onError, ...args }) => {
  const { doLoad } = useLoading();
  const router = useRouter();

  const _uploadMedia = async ({type, url, file}) => {
        if (file && file instanceof File || typeof file === 'object') {
          let [mediaURL, thumbnail] = await api.front.uploadFile(mediaURL);
          return { type, url: mediaURL, thumbnail};
        } 
        return {type, url};
  }

  const _completeFields = (project) => {
    if (project.presentation) {
      Object.entries(PROJECT_PRESENTATION_REQUIRED_FIELDS).forEach(([key, field]) => {
        if (!project.presentation[key]) {
          project.presentation[key] = field.mapFromProject(project);
        }
      });
    } 
  }

  const onSubmit = async (flatFormData) => {
    doLoad(true);
    let projectObject = createObjectFromFlatParams(flatFormData);
    try {
      
      projectObject.presentation?.media = await Promise.all(projectObject.presentation?.media?.map(m => _uploadMedia(m)) || []);
      _completeFields(projectObject);

      const projectResponse = await api.front.newProject(projectObject);
      onDone(projectResponse);

      const viewURL = resolveRoute(ROUTES.projects.view, projectResponse.id);
      router.push(viewURL);
    } catch (err) {
      logger.log(err);
      onError(err);
    }

    doLoad(false);
  };

  return <ProjectForm project={project} onSubmit={onSubmit} {...args} />;
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
