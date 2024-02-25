import ProjectPlugins from './ProjectPlugins.component';

const ProjectPluginsContainer = ({ projectPresentation, isAdmin }) => {
  const data = fetchPluginsData(projectPresentation.project.id);

  return (
    <ProjectPlugins
      projectPresentation={projectPresentation}
      pluginData={data}
      isAdmin={isAdmin}
    />
  );
};

const fetchPluginsData = (projectId) => {
  /*
    Fetch all data for plugins / management
  */
  return {
    management: {
      actions: [],
      data: {
        constitution: {
          byLaws: [],
        },
      },
    },
  };
};

export default ProjectPluginsContainer;
