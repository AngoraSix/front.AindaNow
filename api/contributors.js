class ContributorsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getContributor(contributorId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = await this.axios.getAuthorizationHeaders(token, false);
    const { data } = await this.axios.get(`/${contributorId}`, {
      headers: {
        ...headers,
        ...authHeaders,
      },
    });
    return data;
  }

  async patchContributor(contributorId, patchBody, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = await this.axios.getAuthorizationHeaders(token, false);

    const response = await this.axios.patch(`/${contributorId}`, patchBody, {
      headers: {
        ...headers,
        ...authHeaders,
      },
    });
    return response;
  }
}

export default ContributorsAPI;
