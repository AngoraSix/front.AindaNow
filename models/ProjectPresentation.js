import { toType } from '../utils/helpers';
import Media from './Media';
import Project from './Project';

export default class ProjectPresentation {
  constructor({ id, referenceName, sections, projectId, project }) {
    this.id = id;
    this.referenceName = referenceName;
    this.sections = toType(sections, PresentationSection);
    this.projectId = projectId;
    this.project = toType(project, Project);
  }

  completeRequiredFields(project) {
    this.referenceName = this.referenceName || project.name;
    this.sections.forEach((s) => s.completeRequiredFields(project));
  }
}

class PresentationSection {
  constructor({ title, description, media, mainMedia }) {
    this.title = title;
    this.description = description;
    this.media = toType(media, Media);
    this.mainMedia = toType(mainMedia, Media, true);
  }

  completeRequiredFields(project) {
    this.title = this.title || project.name;
  }
}
