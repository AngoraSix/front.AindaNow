import { isImage, processImage } from './image';
import { isYoutubeURL, processYoutubeUrl } from './youtube';

const _processInputElement = async (mediaDataElement) => {
  if (isImage(mediaDataElement)) {
    return processImage(mediaDataElement);
  }
  if (isYoutubeURL(mediaDataElement)) {
    return processYoutubeUrl(mediaDataElement);
  }
};
// Resolve media depending on different output, always retrieves an array
const resolveToMediaArray = async (mediaInput = []) => {
  mediaInput =
    Array.isArray(mediaInput) || mediaInput instanceof FileList
      ? Array.from(mediaInput)
      : [mediaInput];
  return (await Promise.all(mediaInput.map(_processInputElement))).filter(
    (media) => !!media
  );
};

export default resolveToMediaArray;
