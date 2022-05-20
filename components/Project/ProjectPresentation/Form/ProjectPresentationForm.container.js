import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../../api';
import { resolveRoute, ROUTES } from '../../../../constants';
import { useLoading, useNotifications } from '../../../../hooks/app';
import ProjectPresentation from '../../../../models/ProjectPresentation';
import { toType } from '../../../../utils/helpers';
import logger from '../../../../utils/logger';
import { uploadAllMedia } from '../../../../utils/media/mediaProcessor';
import ProjectPresentationDialog from './Dialog';
import ProjectPresentationForm from './ProjectPresentationForm.component';
import ProjectPresentationFormReducer, {
  INITIAL_STATE,
  updateFieldsAction,
} from './ProjectPresentationForm.reducer';

const ProjectPresentationFormContainer = ({
  projectPresentation,
  isTriggeredAction,
}) => {
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();
  const router = useRouter();
  const [formData, dispatch] = useReducer(ProjectPresentationFormReducer, {
    ...INITIAL_STATE,
    ...toType(projectPresentation, ProjectPresentation).toFormData(),
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
      let projectPresentationToSubmit =
        ProjectPresentation.fromFormData(formData);
      projectPresentationToSubmit = await uploadAllMedia(
        projectPresentationToSubmit
      );
      //@TODO check required fields or trigger error

      const projectPresentationResponse =
        await api.front.saveProjectPresentation(
          projectPresentationToSubmit,
          !!projectPresentation
        );

      onSuccess('Project Presentation Saved Successfully');

      const viewURL = resolveRoute(
        ROUTES.projects.presentations.view,
        projectPresentationResponse.projectId,
        projectPresentationResponse.id
      );
      router.push(viewURL);
    } catch (err) {
      logger.error(err);
      onError('Error Saving Project Presentation');
    }

    doLoad(false);
  };

  return isTriggeredAction ? (
    <ProjectPresentationDialog projectId={projectPresentation.projectId}>
      <ProjectPresentationForm
        formData={formData}
        onFormChange={onFormChange}
        onSubmit={onSubmit}
      />
    </ProjectPresentationDialog>
  ) : (
    <ProjectPresentationForm
      formData={formData}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
    />
  );
};

ProjectPresentationFormContainer.defaults = {
  isTriggeredAction: false,
};

ProjectPresentationFormContainer.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
  isTriggeredAction: PropTypes.bool,
};

export default ProjectPresentationFormContainer;
