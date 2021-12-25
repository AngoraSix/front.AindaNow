class FrontAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async setProfileAttributes(attributes) {
    const { data } = await this.axios.post(`api/profile`, attributes);
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
}

export default FrontAPI;
