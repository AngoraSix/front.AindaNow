class ProjectsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async fetchProjectPresentations(attributes) {
    // traer projects  pasados por projects-presentation?
    const { data } = await this.axios.get(`/presentations?${attributes}`);
    return data;
  }

  async newProject(newProject, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);
    let newPresentation = newProject.presentation;
    delete newProject.presentation;
    let createdPresentation = null;
    const { data: createdProject } = await this.axios.post(
      `/core`,
      newProject,
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );

    if (newPresentation) {
      const { data } = await this.axios.post(
        `/presentations`,
        newPresentation,
        {
          headers: {
            ...headers,
            ...authHeaders,
          },
        }
      );
      createdPresentation = data;
    }
    return { ...createdProject, presentation: createdPresentation };
  }
}

export default ProjectsAPI;
