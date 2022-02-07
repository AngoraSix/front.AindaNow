export const PROFILE_ATTRIBUTES = {
  headImage: {
    key: 'headImage',
    label: 'head image',
  },
  headImageThumbnail: {
    key: 'headImage.thumbnail',
    label: 'head image',
  },
  profilePicture: {
    key: 'picture',
    label: 'profile picture',
  },
  profilePictureThumbnail: {
    key: 'picture.thumbnail',
    label: 'profile picture',
  },
};

export const resolveRoute = (route, ...args) => {
  return args.reduce(
    // replace each path pattern
    (url, replaceString) => url.replace(/:\w+/, replaceString),
    route
  );
};

export const ROUTES = {
  projects: {
    new: '/projects/new',
    view: '/projects/view/:projectId',
    list: '/',
  },
  profile: {
    view: '/profile/:profileId',
  },
};

export const INPUT_FIELD_TYPES = {
  IMAGE: 'image',
  TEXT: 'text',
  YOUTUBEVIDEO: 'video.youtube',
};

export const MEDIA_OPTIONS = {
  IMAGE: 'image',
  VIDEO_YOUTUBE: 'video.youtube',
};

export const DRAGGABLE_ITEMS = {
  MEDIA_CARD: 'MEDIA_CARD',
};
