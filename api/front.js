class FrontAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async setProfileAttribute(fieldName, fieldValue) {
    const { data } = await this.axios.post(`api/profile`, {
      [fieldName]: fieldValue,
    });
    return data;
  }
}

export default FrontAPI;
