import { CLUB_MEMBERSHIP_OPERATIONS } from '../constants';
import createPatchBody, {
  PATCH_SUPPORTED_OPERATIONS
} from '../utils/rest/patch/patchOperations';

const FRONT_TO_PATCH_OPERATIONS_MAPPING = {
  [CLUB_MEMBERSHIP_OPERATIONS.JOIN]: PATCH_SUPPORTED_OPERATIONS.ADD,
  [CLUB_MEMBERSHIP_OPERATIONS.WITHDRAW]: PATCH_SUPPORTED_OPERATIONS.REMOVE,
};

class ClubsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async handleWellKnownClubMembership(projectId, clubType, operation, data, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);

    const { data: patchResult } = await this.axios.patch(
      `/clubs/well-known/${projectId}/${clubType}`,
      createPatchBody(FRONT_TO_PATCH_OPERATIONS_MAPPING[operation], 'members', {
        contributorId: token.user.id,
        data
      }),
      {
        headers: {
          ...headers,
          ...authHeaders,
        },
      }
    );
    return patchResult;
  }

  async getWellKnownClub(projectId, clubType, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token);

    const { data } = await this.axios.get(
      `/clubs/well-known/${projectId}/${clubType}`,
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
