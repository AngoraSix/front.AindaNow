import {
  createObjectFromFlatParams,
  createObjectWithFlatParams,
  toType
} from '../utils/helpers';
import PresentationSection from './PresentationSection';
import Project from './Project';

export default class ProjectPresentation {
  constructor({ id, referenceName, sections, projectId, project }) {
    this.id = id;
    this.referenceName = referenceName;
    this.sections = toType(sections, PresentationSection);
    this.projectId = projectId;
    this.project = toType(project, Project);
  }

  static fromFormData(formData) {
    let projectPresentationObject = createObjectFromFlatParams(formData);
    return new ProjectPresentation(projectPresentationObject);
  }

  completeRequiredFields(project) {
    this.referenceName = this.referenceName || project.name;
    this.sections.forEach((s) => s.completeRequiredFields(project));
  }

  toFormData() {
    let asd = createObjectWithFlatParams(this);
    return asd;
  }
}
