import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class NotificationsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getNotifications(
    token,
    { number = 0, size = 20, sort = '-dismissed,-instantOfCreation' }
  ) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(
      `/notifications?pageSize=${size}&page=${number}&sort=${sort}`,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    );
    return data;
  }

  async listenContributorNotifications(token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    var eventSourceConfig = {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    };

    const baseUrl = this.axios.getCurrentAxiosInstance().defaults.baseURL;
    let eventSource = new EventSource(
      `${baseUrl}/notifications`,
      eventSourceConfig
    );
    return eventSource;
  }
}

export default NotificationsAPI;
