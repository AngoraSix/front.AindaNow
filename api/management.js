import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class ManagementAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getProjectManagement(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(`/projects/${projectId}/management`, {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
      validateStatus: (status) => {
        return status < 400 || status == 404 // 404 is valid for non admin contributors
      }
    });
    return data;
  }

}

export default ManagementAPI;
