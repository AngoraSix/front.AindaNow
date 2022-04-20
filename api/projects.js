class ProjectsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async fetchProjectPresentations(attributes) {
    const { data: projectPresentationdata } = await this.axios.get(
      `/presentations?${attributes}`
    );
    return projectPresentationdata;
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
      newPresentation.projectId = createdProject.id;
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

  async getProjectPresentation(projectPresentationId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const { data } = await this.axios.get(
      `/presentations/${projectPresentationId}`,
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );
    return data;
  }

  async getProject(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const { data } = await this.axios.get(`/core/${projectId}`, {
      headers: {
        ...headers,
        ...authHeaders,
      },
    });
    return data;
  }
}

export default ProjectsAPI;
