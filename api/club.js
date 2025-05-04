import config from '../config';
import { CLUB_MEMBERSHIP_OPERATIONS } from '../constants';
import { obtainInfraHeaders } from '../utils/infra';
import createPatchBody, {
  PATCH_SUPPORTED_OPERATIONS,
} from '../utils/rest/patch/patchOperations';

const FRONT_TO_PATCH_OPERATIONS_MAPPING = {
  [CLUB_MEMBERSHIP_OPERATIONS.JOIN]: PATCH_SUPPORTED_OPERATIONS.ADD,
  [CLUB_MEMBERSHIP_OPERATIONS.WITHDRAW]: PATCH_SUPPORTED_OPERATIONS.REMOVE,
};

class ClubsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async handleWellKnownClubMembership(
    projectId,
    clubType,
    operation,
    data,
    token
  ) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data: patchResult } = await this.axios.patch(
      `/well-known/project/${projectId}/${clubType}`,
      createPatchBody(FRONT_TO_PATCH_OPERATIONS_MAPPING[operation], 'members', {
        contributorId: token.user.id,
        data,
      }),
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    );
    return patchResult;
  }

  async getWellKnownClub(projectId, clubType, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(
      `/well-known/project/${projectId}/${clubType}`,
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

  async getAllWellKnownClubs(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get(`/well-known/project/${projectId}`, {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    return data;
  }

  async registerAllWellKnownClubs(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.post(
      `/well-known/project/${projectId}`,
      {},
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

  async getAdministeredWellKnownClubs(adminId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const { data } = await this.axios.get('/well-known/', {
      params: { adminId: adminId },
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    return data;
  }
}

export default ClubsAPI;
