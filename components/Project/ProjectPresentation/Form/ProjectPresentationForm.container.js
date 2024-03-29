import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../../../api';
import { ROUTES } from '../../../../constants';
import { useLoading, useNotifications } from '../../../../hooks/app';
import ProjectPresentation from '../../../../models/ProjectPresentation';
import { resolveRoute } from '../../../../utils/api/apiHelper';
import { toType } from '../../../../utils/helpers';
import logger from '../../../../utils/logger';
import { uploadAllMedia } from '../../../../utils/media/mediaProcessor';
import ProjectPresentationDialog from './Dialog';
import ProjectPresentationForm from './ProjectPresentationForm.component';
import ProjectPresentationFormReducer, {
  INITIAL_STATE,
  updateFieldsAction,
  updateFormWasSubmitted,
  updatedCompletedFormSection,
} from './ProjectPresentationForm.reducer';

const ProjectPresentationFormContainer = ({
  project,
  projectPresentation,
  isTriggeredAction,
}) => {
  const { t } = useTranslation('project-presentations.edit');
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();
  const router = useRouter();
  const [formState, dispatch] = useReducer(ProjectPresentationFormReducer, {
    ...INITIAL_STATE,
    formData: {
      ...(toType(projectPresentation, ProjectPresentation)?.toFormData() || {}),
    },
  });

  // we want to support updating several fields at once => value can be an array of fields
  const onFormChange = (property) => (eventOrValue) => {
    const partialFormData =
      Array.isArray(eventOrValue) && property == null
        ? Object.assign({}, ...eventOrValue.map(([p, v]) => ({ [p]: v })))
        : {
            [property]: eventOrValue.target
              ? eventOrValue.target.value
              : eventOrValue,
          };

    dispatch(updateFieldsAction(partialFormData));
  };

  const setIsSectionCompleted = (section) => (isCompleted) => {
    dispatch(updatedCompletedFormSection(section, isCompleted));
  };

  const onSubmit = async () => {
    doLoad(true);
    if (Object.values(formState.completedSections).some((v) => !v)) {
      dispatch(updateFormWasSubmitted(true));
    } else {
      try {
        let projectPresentationToSubmit = ProjectPresentation.fromFormData(
          formState.formData
        );
        projectPresentationToSubmit = await uploadAllMedia(
          projectPresentationToSubmit
        );
        projectPresentationToSubmit.completeRequiredFields(project);
        //@TODO check required fields or trigger error

        const projectPresentationResponse =
          await api.front.saveProjectPresentation(
            projectPresentationToSubmit,
            projectPresentation?.id,
            project.id
          );

        onSuccess(
          t('project-presentations.edit.form.notifications.success.saved')
        );

        const viewURL = isTriggeredAction
          ? resolveRoute(ROUTES.projects.edit, project.id)
          : resolveRoute(
              ROUTES.projects.presentations.view,
              projectPresentationResponse.projectId,
              projectPresentationResponse.id
            );
        router.push(viewURL);
      } catch (err) {
        logger.error(err);
        onError('Error Saving Project Presentation');
        doLoad(false);
      }
    }
  };

  return isTriggeredAction ? (
    <ProjectPresentationDialog projectId={project.id}>
      <ProjectPresentationForm
        formData={formState.formData}
        onFormChange={onFormChange}
        onSubmit={onSubmit}
        setIsSectionCompleted={setIsSectionCompleted}
        wasSubmitted={formState.wasSubmitted}
      />
    </ProjectPresentationDialog>
  ) : (
    <ProjectPresentationForm
      formData={formState.formData}
      onFormChange={onFormChange}
      onSubmit={onSubmit}
      setIsSectionCompleted={setIsSectionCompleted}
      wasSubmitted={formState.wasSubmitted}
    />
  );
};

ProjectPresentationFormContainer.defaults = {
  isTriggeredAction: false,
  projectPresentation: {},
};

ProjectPresentationFormContainer.propTypes = {
  projectPresentation: PropTypes.object,
  project: PropTypes.object.isRequired,
  isTriggeredAction: PropTypes.bool,
};

export default ProjectPresentationFormContainer;
