import {
  createObjectFromFlatParams,
  createObjectWithFlatParams,
  toType,
} from '../utils/helpers';
import ProjectPresentation from './ProjectPresentation';

export default class Project {
  constructor({ id, name, presentations, adminId }) {
    this.id = id;
    this.name = name;
    this.presentations = presentations;
    this.adminId = adminId;
  }

  static fromFormData(formData) {
    let projectObject = createObjectFromFlatParams(formData);
    return new Project(projectObject);
  }

  toFormData() {
    return createObjectWithFlatParams(this);
  }

  completeRequiredFields() {
    this.presentations.forEach((pr) => pr.completeRequiredFields(this));
  }

  /**
   * @param {ProjectPresentation} presentations
   */
  set presentations(presentations) {
    this._presentations = toType(presentations, ProjectPresentation);
  }

  get presentations() {
    return this._presentations;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      presentations: this.presentations,
      adminId: this.adminId,
    };
  }
}
