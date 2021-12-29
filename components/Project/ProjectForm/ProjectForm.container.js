import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import api from '../../../api';
import { useLoading } from '../../../hooks/app';
import logger from '../../../utils/logger';
import ProjectForm from './ProjectForm.component';
import { ROUTES, resolveRoute } from '../../../constants';

const ProjectFormContainer = ({ project, onDone, onError, ...args }) => {
  const { doLoad } = useLoading();
  const router = useRouter();

  const onSubmit = async (formData) => {
    doLoad(true);
    let projectImages = formData.images || [];
    projectImages = projectImages.filter((img) => !!img);
    let images = [];
    try {
      if (projectImages.length) {
        let thumbnailImages = formData.thumbnailImages || [];
        images = await Promise.all(
          projectImages.map(async (image, index) => {
            let imageURL = image;
            let thumbnailURL = thumbnailImages[index];
            // eslint-disable-next-line no-undef
            if (imageURL instanceof File || typeof imageURL === 'object') {
              [imageURL, thumbnailURL] = await api.front.uploadFile(image);
            }
            return { url: imageURL, thumbnail: thumbnailURL, type: 'image' };
          })
        );
      }

      const projectDataToSubmit = {
        ...formData,
        images,
      };

      const projectResponse = await api.front.newProject(projectDataToSubmit);
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
