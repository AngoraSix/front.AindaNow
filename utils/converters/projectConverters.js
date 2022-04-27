import {
  createObjectFromFlatParams,
  createObjectWithFlatParams,
} from '../helpers';
import { uploadMedia } from '../media/mediaProcessor';

const _completeFields = (project, requiredFields) => {
  if (project.presentation) {
    Object.entries(requiredFields).forEach(([key, field]) => {
      if (!project.presentation[key]) {
        project.presentation[key] = field.mapFromProject(project);
      }
    });
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

export const formToProject = async (flatFormData, requiredFields) => {
  let projectObject = createObjectFromFlatParams(flatFormData);
  if (projectObject.presentation) {
    projectObject.presentation.media = await Promise.all(
      projectObject.presentation?.media?.map((m) => uploadMedia(m)) || []
    );
    if (projectObject.presentation.mainMedia?.length === 1) {
      projectObject.presentation.mainMedia = await uploadMedia(
        projectObject.presentation.mainMedia[0]
      );
    }
  }
  _completeFields(projectObject, requiredFields);
  _presentationAsSection(projectObject);
  return projectObject;
};

export const projectToForm = (projectObject = {}) => {
  return createObjectWithFlatParams(projectObject);
};
