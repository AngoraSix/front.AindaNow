class ProjectsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async fetchProjectPresentations(attributes) {
    // traer projects  pasados por projects-presentation?
    const { data } = await this.axios.get(
      `/projects-presentation?${attributes}`
    );
    return data;
  }
}

export default ProjectsAPI;
