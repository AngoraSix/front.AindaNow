import { createObjectFromFlatParams, toType } from '../utils/helpers';
import ProjectPresentation from './ProjectPresentation';

export default class Project {
  #presentations;
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

  toFormData(fieldSuffix = '') {
    return Object.assign(
      {
        [`${fieldSuffix}id`]: this.id,
        [`${fieldSuffix}name`]: this.name,
        [`${fieldSuffix}adminId`]: this.adminId,
      },
      ...(this.presentations?.flatMap((pr, i) =>
        pr.toFormData(`${fieldSuffix}presentations[${i}].`)
      ) || [])
    );
  }

  completeRequiredFields() {
    this.presentations?.forEach((pr) => pr.completeRequiredFields(this));
  }

  /**
   * @param {ProjectPresentation} presentations
   */
  set presentations(presentations) {
    this.#presentations = toType(presentations, ProjectPresentation);
  }

  get presentations() {
    return this.#presentations;
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
