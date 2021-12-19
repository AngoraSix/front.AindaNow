class FrontAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async setProfileAttributes(attributes) {
    const { data } = await this.axios.post(`api/profile`, attributes);
    return data;
  }
}

export default FrontAPI;
