class ProjectsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async fetchProjectPresentations(attributes) {
    // traer projects  pasados por projects-presentation?
    const { data } = await this.axios.get(`/presentations?${attributes}`);
    return data;
  }
}

export default ProjectsAPI;
