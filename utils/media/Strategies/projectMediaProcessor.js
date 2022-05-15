import projectPresentationMediaProcessor from './projectPresentationMediaProcessor';

export default async (project) => {
  if (project.presentations?.sections) {
    project.presentations = await projectPresentationMediaProcessor(
      project.presentations
    );
  }
  return project;
};
