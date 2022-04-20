import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../../../api';
import config from '../../../config';
import { MEDIA_TYPES, resolveRoute, ROUTES } from '../../../constants';
import { useLoading } from '../../../hooks/app';
import { createObjectFromFlatParams } from '../../../utils/helpers';
import logger from '../../../utils/logger';
import ProjectForm from './ProjectForm.component';
import { PROJECT_PRESENTATION_REQUIRED_FIELDS } from './ProjectForm.properties';

const ProjectFormContainer = ({ project, onDone, onError, ...args }) => {
  const { doLoad } = useLoading();
  const router = useRouter();

  const _uploadMedia = async (media) => {
    const file = media.file;
    let resourceId = media.resourceId;
    let thumbnailURL = media.thumbnailUrl;
    let mediaURL;
    if (file && (file instanceof File || typeof file === 'object')) {
      [mediaURL, thumbnailURL] = await api.front.uploadFile(file);
      resourceId = mediaURL.split('/').pop();
    } else if (media.mediaType === MEDIA_TYPES.VIDEO_YOUTUBE) {
      const resolvedEmbedUrl =
        config.thirdParties.youtube.embedUrlPattern.replace(
          ':resourceId',
          media.resourceId
        );
      mediaURL = resolvedEmbedUrl;
    }
    return {
      mediaType: media.mediaType,
      url: mediaURL,
      thumbnailUrl: thumbnailURL,
      resourceId: resourceId,
    };
  };

  const _completeFields = (project) => {
    if (project.presentation) {
      Object.entries(PROJECT_PRESENTATION_REQUIRED_FIELDS).forEach(
        ([key, field]) => {
          if (!project.presentation[key]) {
            project.presentation[key] = field.mapFromProject(project);
          }
        }
      );
    }
  };

  const _presentationAsSection = (project) => {
    if (project.presentation) {
      project.presentation.sections = [{ ...project.presentation }];
      delete project.presentation.mainMedia;
      delete project.presentation.media;
      delete project.presentation.title;
      delete project.presentation.description;
    }
  };

  const onSubmit = async (flatFormData) => {
    doLoad(true);
    let projectObject = createObjectFromFlatParams(flatFormData);
    try {
      if (projectObject.presentation) {
        projectObject.presentation.media = await Promise.all(
          projectObject.presentation?.media?.map((m) => _uploadMedia(m)) || []
        );
        if (projectObject.presentation.mainMedia?.length === 1) {
          projectObject.presentation.mainMedia = await _uploadMedia(
            projectObject.presentation.mainMedia[0]
          );
        }
      }
      _completeFields(projectObject);
      _presentationAsSection(projectObject);

      const projectResponse = await api.front.newProject(projectObject);
      onDone(projectResponse);

      const viewURL = resolveRoute(
        ROUTES.projects.presentations.view,
        projectResponse.presentation.id
      );
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
