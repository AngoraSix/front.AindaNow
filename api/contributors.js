class ContributorsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getContributor(contributorId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const { data } = await this.axios.get(`/contributors/${contributorId}`, {
      headers: {
        ...headers,
        ...authHeaders,
      },
    });
    return data;
  }

  async setAttributes(attributes, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const response = await this.axios.post(
      `/contributors/attributes`,
      { attributes },
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );
    return response;
  }
}

export default ContributorsAPI;
