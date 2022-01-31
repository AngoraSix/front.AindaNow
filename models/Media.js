export default class Media {
  constructor(mediaType, thumbnailUrl = '', resourceId, file) {
    this.mediaType = mediaType;
    this.resourceId = resourceId || thumbnailUrl;
    this.thumbnailUrl = thumbnailUrl;
    this.file = file;
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
