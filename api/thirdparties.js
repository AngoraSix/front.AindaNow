import axios from 'axios';
import config from '../config';

class ThirdPartiesAPI {
  constructor() {
    this.axios = axios.create({});
  }

  // Youtube

  /**
   * Search Youtube videos using filter.
   *
   * @param {*} param0 filter to be used in the search
   * @returns list of videos matching filter
   */
  async searchVideoData({ id }) {
    const resolvedUrl = config.thirdParties.youtube.videoApiUrlTemplate
      .replace(':videoId', id)
      .replace(':apiKey', config.thirdParties.youtube.apiKey);
    const { data } = await this.axios.get(resolvedUrl);
    return data.items;
  }

  async fetchYoutubeVideoData(id) {
    const foundVideos = await this.searchVideoData({ id });
    return foundVideos[0];
  }

  async fetchYoutubeVideoTumbnail(id) {
    const foundVideo = await this.fetchYoutubeVideoData(id);
    const videoThumbnail =
      foundVideo?.snippet.thumbnails.standard?.url ||
      foundVideo?.snippet.thumbnails.medium?.url ||
      foundVideo?.snippet.thumbnails.default?.url;
    return videoThumbnail;
  }

  async verifyGoogleRecaptchaToken(grecaptchaToken) {
    const verificationURL = config.thirdParties.googleRecaptcha.verifyUrl

    const params = new URLSearchParams();
    params.append('secret', process.env.AN_APP_THIRDPARTIES_GOOGLERECAPTCHA_SECRET);
    params.append('response', grecaptchaToken);

    const { data } = await this.axios.post(verificationURL, params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return data;
  }
}

export default ThirdPartiesAPI;
