class ThirdParties {
  constructor(env) {
    this.youtube = {
      apiKey: env.AN_APP_THIRDPARTIES_YOUTUBE_APIKEY || 'abc123',
      videoApiUrlTemplate:
        env.AN_APP_THIRDPARTIES_YOUTUBE_VIDEOAPIURL ||
        'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=:videoId&key=:apiKey',
      uploadPage:
        env.AN_APP_THIRDPARTIES_YOUTUBE_UPLOADPAGE ||
        'https://studio.youtube.com/',
      embedUrlPattern:
        env.AN_APP_THIRDPARTIES_YOUTUBE_EMBEDURLPATTERN ||
        'https://www.youtube.com/embed/:resourceId',
    };
    this.angorasix = {
      host: env.AN_APP_THIRDPARTIES_ANGORASIX_HOST || 'http://localhost:10700',
      viewProjectManagementPath: env.AN_APP_THIRDPARTIES_ANGORASIX_VIEW_PROJECTMGMT || '/managements/:mgmtId',
    };
    this.googleAnalytics = {
      id: env.AN_APP_THIRDPARTIES_GOOGLEANALYTICS_ID || 'abc123',
    };
  }
}

export default ThirdParties;
