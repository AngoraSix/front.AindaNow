import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class ContributorsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getContributor(contributorId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(`/${contributorId}`, {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    return data;
  }

  async patchContributor(contributorId, patchBody, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const response = await this.axios.patch(`/${contributorId}`, patchBody, {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    return response;
  }

  async listContributors(ids, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get('/', {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
      params: {
        ids: ids.join(),
      },
    });
    return data;
  }
}

export default ContributorsAPI;
