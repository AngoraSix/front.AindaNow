export default class Media {
  constructor(mediaType, key, thumbnailUrl = '', resourceId, file) {
    this.mediaType = mediaType;
    this.resourceId = resourceId || thumbnailUrl;
    this.thumbnailUrl = thumbnailUrl;
    this.file = file;
    this.key = `${mediaType}-${key || resourceId}`;
  }

  static isMedia(object) {
    if (
      object == null ||
      !object instanceof Media ||
      !(typeof object === 'object' && !Array.isArray(object))
    ) {
      return false;
    }
    return !!object.mediaType;
  }
}
