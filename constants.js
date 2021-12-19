export const PROFILE_ATTRIBUTES = {
  headImage: {
    key: 'headImage',
    label: 'head image',
  },
  profilePicture: {
    key: 'picture',
    label: 'profile picture',
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
