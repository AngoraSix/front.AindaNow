import NodeFormData from 'form-data';
import config from '../config';
import { obtainInfraHeaders } from '../utils/infra';

const IS_ABSOLUTE_URL_REGEX = new RegExp('^(?:[a-z]+:)?//', 'i');

class MediaAPI {
  constructor(axiosInstance, overrideBaseURL) {
    this.axios = axiosInstance;
    this.mediaOverrideBaseURL = overrideBaseURL;
  }

  async uploadImages(files, token) {
    const headers = this.axios.getCommonHeaders();
    const authHeaders = this.axios.getAuthorizationHeaders(token, true);
    const infraHeaders = await obtainInfraHeaders(
      config.infra,
      config.api.serverBaseURL
    );

    const formData =
      typeof window !== 'undefined' ? new FormData() : new NodeFormData();
    if (Array.isArray(files)) {
      files.forEach((f) => formData.append('file', f.buffer, f.originalname));
    } else {
      formData.append('file', files);
    }
    const { data } = await this.axios.post('/images', formData, {
      headers: {
        ...formData.getHeaders(),
        ...headers,
        ...authHeaders,
        ...infraHeaders,
      },
    });
    const urls = data.images.map((im) =>
      isAbsoluteURL(im)
        ? im
        : `${this.mediaOverrideBaseURL || this.axios.getBaseURL()}${im}`
    );
    const thumbnails = data.thumbnailImages.map((im) =>
      isAbsoluteURL(im)
        ? im
        : `${this.mediaOverrideBaseURL || this.axios.getBaseURL()}${im}`
    );

    return { urls, thumbnails };
  }
}

const isAbsoluteURL = (url) => {
  return IS_ABSOLUTE_URL_REGEX.test(url);
};

export default MediaAPI;
