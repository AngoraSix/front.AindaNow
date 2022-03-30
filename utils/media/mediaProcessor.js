import { MEDIA_TYPES } from '../../constants';
import Media from '../../models/Media';
import { isImage, processImage } from './image';
import { isYoutubeURL, processYoutubeUrl } from './youtube';

const _processInputElement = async (mediaDataElement, allowedMediaTypes) => {
  if (mediaDataElement instanceof Media) {
    return mediaDataElement;
  }

  if (
    isImage(mediaDataElement) &&
    allowedMediaTypes.includes(MEDIA_TYPES.IMAGE)
  ) {
    return processImage(mediaDataElement);
  }
  if (
    isYoutubeURL(mediaDataElement) &&
    allowedMediaTypes.includes(MEDIA_TYPES.VIDEO_YOUTUBE)
  ) {
    return processYoutubeUrl(mediaDataElement);
  }
};
// Resolve media depending on different output, always retrieves an array
const resolveToMediaArray = async (mediaInput = [], allowedMediaTypes = []) => {
  mediaInput =
    Array.isArray(mediaInput) || mediaInput instanceof FileList
      ? Array.from(mediaInput)
      : [mediaInput];
  return (
    await Promise.all(
      mediaInput.map((m) => _processInputElement(m, allowedMediaTypes))
    )
  ).filter((media) => !!media);
};

export default resolveToMediaArray;
