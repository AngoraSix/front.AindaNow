import { toType } from '../utils/helpers';
import Media from './Media';

export default class PresentationSection {
  #mainMedia;
  #media;
  constructor({ title, description, media, mainMedia }) {
    this.title = title;
    this.description = description;
    this.media = media;
    this.mainMedia = mainMedia;
  }

  completeRequiredFields(project) {
    this.title = this.title || project.name;
    this.media?.forEach((m) => m.completeRequiredFields());
    this.mainMedia.completeRequiredFields();
  }

  /**
   * @param {Media} mainMedia
   */
  set mainMedia(mainMedia) {
    this.#mainMedia = toType(mainMedia, Media, true);
  }

  get mainMedia() {
    return this.#mainMedia;
  }

  /**
   * @param {Media} media
   */
  set media(media) {
    this.#media = toType(media, Media);
  }

  get media() {
    return this.#media;
  }

  toFormData(fieldSuffix = '') {
    return {
      [`${fieldSuffix}title`]: this.title,
      [`${fieldSuffix}description`]: this.description,
      [`${fieldSuffix}mainMedia`]: this.mainMedia,
      [`${fieldSuffix}media`]: this.media,
    };
  }

  toJSON() {
    return {
      title: this.title,
      description: this.description,
      media: this.media,
      mainMedia: this.mainMedia,
    };
  }
}
