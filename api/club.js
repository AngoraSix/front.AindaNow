class ClubsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async addMemberToWellKnownClub(projectId, clubType, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);

    const { data } = await this.axios.post(
      `/clubs/well-known/${projectId}/${clubType}/add-member`,
      {},
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );
    return data;
  }
}

export default ClubsAPI;
