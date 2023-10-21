import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

class ProjectsAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async fetchProjectPresentations(attributes, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);

    // console.log('GERGERGER 99 - FETCHPROJECTS');
    // // console.log(this.axios.getBaseURL().);
    // console.log(config.api.serverBaseURL);
    // console.log(this.axios.serverBaseURL);
    // console.log('GERGERGER 99 - FETCHPROJECTS FINISH LOGS');

    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    // console.log('GERGERGER 88 - A VERGER');
    // console.log(infraHeaders);
    // console.log(infraHeaders['X-Serverless-Authorization']);

    // console.log('GERGERGER 77 - A VERGER');
    // console.log(
    //   {
    //     ...headers,
    //     ...authHeaders,
    //     ...infraHeaders,
    //   }['X-Serverless-Authorization']
    // );

    // console.log('WHATAMARATATA');
    // const data2 = await this.axios.get(
    //   `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${config.api.serverBaseURL}`,
    //   {
    //     headers: {
    //       'Metadata-Flavor': 'Google',
    //     },
    //   }
    // );
    // console.log(data2);
    // console.log(data2?.data);
    console.log("WHATAGERGERGER");
    console.log({
      ...headers,
      ...authHeaders,
      ...infraHeaders,
    });
    console.log({
      ...headers,
      ...authHeaders,
      ...infraHeaders,
    }['Authorization'])
    console.log({
      ...headers,
      ...authHeaders,
      ...infraHeaders,
    }['X-Serverless-Authorization'])
    const { data: projectPresentationdata } = await this.axios.get(
      `/presentations?${attributes}`,
      {
        params: attributes,
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    );
    return projectPresentationdata;
  }

  async fetchProjects(attributes = {}, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      this.axios.getBaseURL()
    );

    const { data: projectData } = await this.axios.get(`/core`, {
      params: attributes,
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    return projectData;
  }

  async saveProject(project, token, projectId) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      this.axios.getBaseURL()
    );

    let projectPresentations = project.presentations;
    delete project.presentations;

    const { data: savedProject } = await this.axios[projectId ? 'put' : 'post'](
      `/core/${projectId || ''}`,
      project,
      {
        headers: {
          ...headers,
          ...authHeaders,
          ...infraHeaders,
        },
      }
    );

    let createdPresentations = projectPresentations;
    // we won't be saving Project Presentations if we're just updating the Project
    if (!projectId && projectPresentations) {
      createdPresentations = await Promise.all(
        projectPresentations
          .map((pr) => {
            pr.projectId = savedProject.id;
            return pr;
          })
          .map((pr) =>
            this.saveProjectPresentation(pr, null, savedProject.id, token)
          )
      );
    }
    return { ...savedProject, presentations: createdPresentations };
  }

  async saveProjectPresentation(
    projectPresentation,
    projectPresentationId,
    projectId,
    token
  ) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      this.axios.getBaseURL()
    );

    const { data } = await this.axios[projectPresentationId ? 'put' : 'post'](
      `/${projectId}/presentations/${projectPresentationId || ''}`,
      projectPresentation,
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

  async getProjectPresentation(projectPresentationId, projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      this.axios.getBaseURL()
    );

    const { data } = await this.axios.get(
      `/${projectId}/presentations/${projectPresentationId}`,
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

  async getProject(projectId, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, false);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      this.axios.getBaseURL()
    );

    const { data } = await this.axios.get(`/core/${projectId}`, {
      headers: {
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    return data;
  }
}

export default ProjectsAPI;
