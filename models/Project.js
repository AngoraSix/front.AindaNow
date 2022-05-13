import { createObjectFromFlatParams, toType } from '../utils/helpers';
import ProjectPresentation from './ProjectPresentation';

export default class Project {
  constructor({ id, name, presentations, adminId }) {
    this.id = id;
    this.name = name;
    this.presentations = toType(presentations, ProjectPresentation);
    this.adminId = adminId;
  }

  static fromFormData(formData) {
    let projectObject = createObjectFromFlatParams(formData);
    return new Project(projectObject);
  }

  completeRequiredFields() {
    this.presentations.completeRequiredFields(this);
  }
}
