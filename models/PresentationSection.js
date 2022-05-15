import { toType } from '../utils/helpers';
import Media from './Media';

export default class PresentationSection {
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
