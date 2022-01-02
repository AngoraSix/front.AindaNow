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

export const EDITABLE_FIELD_TYPES = {
  IMAGE: 'image',
  TEXT: 'text',
};

export const USER_PERMISSIONS = {
  companies: {
    post: {
      create: 'companies.post.create',
      update: 'companies.post.update',
    },
    put: {
      update: 'companies.put.update',
    },
  },
  vehicles: {
    post: {
      create: 'vehicles.post.create',
      update: 'vehicles.post.update',
    },
    put: {
      update: 'vehicles.put.update',
    },
  },
  users: {
    get: {
      detail: 'users.get.detail',
    },
    put: {
      detail: 'users.put.detail',
    },
  },
};
