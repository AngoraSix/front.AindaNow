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
        return status < 400 || status == 404; // 404 is valid for project admin contributors (creation actions)
      },
    });
    return data;
  }

  async createProjectManagementById(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    let initialMgmt = {
      constitution: {
        bylaws: [
          {
            scope: 'OWNERSHIP_IS_A6MANAGED',
            definition: true
          }
        ],
      },
      status: config.servicesDefaults.mgmt.mgmtInitialStatus,
    };

    let axiosConfig = {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    };

    const { data } = await this.axios.post(
      `/projects/${projectId}/management`,
      initialMgmt,
      axiosConfig
    );
    return data;
  }
}

export default ManagementAPI;
