import { toType } from '../utils/helpers';
import Media from './Media';

export default class PresentationSection {
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
    this._mainMedia = toType(mainMedia, Media, true);
  }

  get mainMedia() {
    return this._mainMedia;
  }

  /**
   * @param {Media} media
   */
  set media(media) {
    this._media = toType(media, Media);
  }

  get media() {
    return this._media;
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
