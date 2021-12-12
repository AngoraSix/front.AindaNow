class ContributorsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getContributor(contributorId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const {data} = await this.axios.get(`/contributors/${contributorId}`, {
      headers: {
        ...headers,
        ...authHeaders,
      },
    });
    return data;
  }
}

export default ContributorsAPI;
