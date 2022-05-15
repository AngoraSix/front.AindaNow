import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import { useLoading } from '../../../../hooks/app';
import ProjectPresentation from '../../../../models/ProjectPresentation';
import { toType } from '../../../../utils/helpers';
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
      let projectPresentation = ProjectPresentation.fromFormData(formData);
      projectPresentation = await uploadAllMedia(projectPresentation);
      //@TODO
      project.completeRequiredFields();

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

  return isTriggeredAction ? (
    <ProjectPresentationDialog projectId={projectPresentation.projectId}>
      <ProjectPresentationForm
        formData={formData}
        onFormChange={onFormChange}
      />
    </ProjectPresentationDialog>
  ) : (
    <ProjectPresentationForm formData={formData} onFormChange={onFormChange} />
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
