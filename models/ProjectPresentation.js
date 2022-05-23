import {
  createObjectFromFlatParams,
  createObjectWithFlatParams,
  toType,
} from '../utils/helpers';
import PresentationSection from './PresentationSection';
import Project from './Project';

export default class ProjectPresentation {
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
    this.sections.forEach((s) => s.completeRequiredFields(project));
  }

  toFormData() {
    let asd = createObjectWithFlatParams(this);
    return asd;
  }

  /**
   * @param {PresentationSection} sections
   */
  set sections(sections) {
    this._sections = toType(sections, PresentationSection);
  }

  get sections() {
    return this._sections;
  }

  /**
   * @param {Project} project
   */
  set project(project) {
    this._project = toType(project, Project, true);
  }

  get project() {
    return this._project;
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
