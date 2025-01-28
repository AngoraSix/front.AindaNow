import { getFromEnvsOrElse } from "../utils/config";

class ThirdParties {
  constructor(env) {
    this.youtube = {
      apiKey: getFromEnvsOrElse(env, 'AN_APP_THIRDPARTIES_YOUTUBE_APIKEY', 'abc123'),
      videoApiUrlTemplate:
        getFromEnvsOrElse(env, 'AN_APP_THIRDPARTIES_YOUTUBE_VIDEOAPIURL',
          'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=:videoId&key=:apiKey'),
      uploadPage:
        getFromEnvsOrElse(env, 'AN_PUBLIC_APP_THIRDPARTIES_YOUTUBE_UPLOADPAGE',
          'https://studio.youtube.com/'),
      embedUrlPattern:
        getFromEnvsOrElse(env, 'AN_PUBLIC_APP_THIRDPARTIES_YOUTUBE_EMBEDURLPATTERN',
          'https://www.youtube.com/embed/:resourceId'),
    };
    this.angorasix = {
      host: getFromEnvsOrElse(env, 'AN_PUBLIC_APP_THIRDPARTIES_ANGORASIX_HOST', 'http://localhost:10700'),
      viewProjectManagementPath: getFromEnvsOrElse(env, 'AN_PUBLIC_APP_THIRDPARTIES_ANGORASIX_VIEW_PROJECTMGMT', '/managements/:mgmtId'),
    };
    this.googleAnalytics = {
      id: getFromEnvsOrElse(env, 'AN_PUBLIC_APP_THIRDPARTIES_GOOGLEANALYTICS_ID', 'googleAnalytics123'),
    };
    this.googleRecaptcha = {
      key: getFromEnvsOrElse(env, 'AN_PUBLIC_APP_THIRDPARTIES_GOOGLERECAPTCHA_ID', 'recaptchaKey123'),
      secret: getFromEnvsOrElse(env, 'AN_APP_THIRDPARTIES_GOOGLERECAPTCHA_SECRET', 'recaptchaSecret123'),
      verifyUrl: getFromEnvsOrElse(env, 'AN_APP_THIRDPARTIES_GOOGLERECAPTCHA_VERIFYURL', 'https://www.google.com/recaptcha/api/siteverify'),
      minScore: getFromEnvsOrElse(env, 'AN_APP_THIRDPARTIES_GOOGLERECAPTCHA_MINSCORE', 0.5),
    }
  }
}

export default ThirdParties;
