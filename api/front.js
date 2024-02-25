import createPatchBody, {
  PATCH_SUPPORTED_OPERATIONS,
} from '../utils/rest/patch/patchOperations';

class FrontAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async updateProfileField(
    profileId,
    updatedProfileFieldKey,
    updatedProfileFieldValue
  ) {
    const { data } = await this.axios.patch(
      `api/profiles/${profileId}`,
      createPatchBody(
        PATCH_SUPPORTED_OPERATIONS.REPLACE,
        updatedProfileFieldKey,
        updatedProfileFieldValue
      )
    );
    return data;
  }

  async uploadFile(file) {
    const formData = new FormData();
    file = Array.isArray(file) ? file[0] : file;
    formData.append('file', file);
    const { data } = await this.axios.post(`api/upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const images = data.urls;
    const thumbnails = data.thumbnails;

    return images.length && thumbnails.length
      ? [images[0], thumbnails[0]]
      : null;
  }

  async uploadFiles(files) {
    const formData = new FormData();
    if (Array.isArray(files)) {
      files.forEach((f) => formData.append('file[]', f));
    } else {
      formData.append('file', files);
    }
    const { data } = await this.axios.post(`api/upload/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  async saveProject(projectBody, projectId) {
    const { data } = projectId
      ? await this.axios.put(`api/projects/${projectId}`, projectBody)
      : await this.axios.post(`api/projects`, projectBody);
    return data;
  }

  async saveProjectPresentation(
    projectPresentationBody,
    projectPresentationId,
    projectId
  ) {
    const { data } = projectPresentationId
      ? await this.axios.put(
          `api/projects/${projectId}/presentations/${projectPresentationId}`,
          projectPresentationBody
        )
      : await this.axios.post(
          `api/projects/${projectId}/presentations`,
          projectPresentationBody
        );
    return data;
  }

  async modifyClubMembership(projectId, clubType, operation, data) {
    const { data: modifyClubMembershipResult } = await this.axios.post(
      `api/clubs/well-known/members`,
      {
        projectId,
        clubType,
        operation,
        data,
      }
    );
    return modifyClubMembershipResult;
  }

  async getClub(projectId, clubType) {
    const { data } = await this.axios.get(
      `api/clubs/well-known/${projectId}/${clubType}`
    );
    return data;
  }

  async getAllProjectClubs(projectId) {
    const { data } = await this.axios.get(`api/clubs/well-known/${projectId}`);
    return data;
  }

  async getProjectManagement(projectId) {
    const { data } = await this.axios.get(
      `api/projects/${projectId}/management`
    );
    return data;
  }

  async createProjectManagementById(projectId) {
    const { data } = await this.axios.post(
      `api/projects/${projectId}/management`
    );
    return data;
  }

  async registerAllProjectClubs(projectId) {
    const { data } = await this.axios.post(`api/clubs/well-known/${projectId}`);
    return data;
  }

  async getAdministeredProjectsClubs(contributorId) {
    const { data } = await this.axios.get(`api/clubs/well-known`, {
      params: { adminId: contributorId },
    });
    return data;
  }

  async getAdministeredProjects(contributorId) {
    const { data } = await this.axios.get(`api/projects`, {
      params: { adminId: contributorId },
    });
    return data;
  }

  async getContributors(contributorIds) {
    const contributorIdsArray = Array.isArray(contributorIds)
      ? contributorIds
      : [contributorIds];
    const { data: membersData } = await this.axios.get(`/api/contributors`, {
      params: { contributorIds: contributorIdsArray.join() },
    });
    return membersData;
  }

  async getContributorNotifications(
    number = 0,
    size = 2, // console.log
    sort = '-dismissed,-instantOfCreation'
  ) {
    console.log('FRONT-01');
    const { data } = await this.axios.get(
      `api/notifications?size=${size}&number=${number}&sort=${sort}`
    );
    console.log('FRONT-01');
    console.log(data);
    return data;
  }

  async streamContributorNotifications() {
    // const baseUrl = this.axios.getCurrentAxiosInstance().defaults.baseURL;
    let eventSource = new EventSource(`/api/notifications`);
    return eventSource;
  }
}

export default FrontAPI;
