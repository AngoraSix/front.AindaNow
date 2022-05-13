import { uploadMedia } from '../mediaProcessor';

export default async (project) => {
  if (project.presentations?.sections) {
    project.presentations.sections = await Promise.all(
      project.presentations.sections.map(async (s) => {
        return _uploadSectionMedia(s);
      })
    );
  }
  return project;
};

const _uploadSectionMedia = async (section) => {
  const [uploadedMainMedia, ...uploadedMedia] = await Promise.all([
    uploadMedia(section.mainMedia),
    ...section.media.map((m) => uploadMedia(m)),
  ]);
  section.mainMedia = uploadedMainMedia;
  section.media = uploadedMedia;
  return section;
};
