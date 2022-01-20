class ThirdParties {
  constructor(env) {
    this.youtube = {
      apiKey: env.A6_APP_THIRDPARTIES_YOUTUBE_APIKEY || 'abc123',
      videoApiUrlTemplate: env.A6_APP_THIRDPARTIES_YOUTUBE_VIDEOAPIURL || 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=:videoId&key=:apiKey',
    };
  }
}

export default ThirdParties;
