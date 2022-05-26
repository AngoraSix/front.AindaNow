import {
  createObjectFromFlatParams,
  createObjectWithFlatParams,
  toType,
} from '../utils/helpers';
import PresentationSection from './PresentationSection';
import Project from './Project';

export default class ProjectPresentation {
  #sections;
  #project;
  constructor({ id, referenceName, sections, projectId, project }) {
    this.id = id;
    this.referenceName = referenceName;
    this.sections = sections;
    this.projectId = projectId;
    this.project = project;
  }

  static fromFormData(formData) {
    let projectPresentationObject = createObjectFromFlatParams(formData);
    return new ProjectPresentation(projectPresentationObject);
  }

  completeRequiredFields(project) {
    this.referenceName = this.referenceName || project.name;
    this.projectId = this.projectId || project.id;
    this.sections?.forEach((s) => s.completeRequiredFields(project));
  }

  toFormData() {
    return createObjectWithFlatParams(this);
  }

  /**
   * @param {PresentationSection} sections
   */
  set sections(sections) {
    this.#sections = toType(sections, PresentationSection);
  }

  get sections() {
    return this.#sections;
  }

  /**
   * @param {Project} project
   */
  set project(project) {
    this.#project = toType(project, Project, true);
  }

  get project() {
    return this.#project;
  }

  toFormData(fieldSuffix = '') {
    return Object.assign(
      {
        [`${fieldSuffix}id`]: this.id,
        [`${fieldSuffix}referenceName`]: this.referenceName,
        [`${fieldSuffix}projectId`]: this.projectId,
        [`${fieldSuffix}project`]: this.project?.toFormData(),
      },
      ...(this.sections?.flatMap((s, i) =>
        s.toFormData(`${fieldSuffix}sections[${i}].`)
      ) || [])
    );
  }

  toJSON() {
    return {
      id: this.id,
      referenceName: this.referenceName,
      sections: this.sections,
      projectId: this.projectId,
      project: this.project,
    };
  }
}
