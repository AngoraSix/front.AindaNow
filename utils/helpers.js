import config from '../config';

export const isMaster = (user) => {
  return (
    user &&
    user.globalPermissions &&
    user.globalPermissions.indexOf(config.app.roles.master) >= 0
  );
};

export const arrayToMapHelper = (objectsArray = [], key = 'id') => {
  return objectsArray.reduce((prev, current) => {
    if (!prev[current[key]]) {
      prev[current[key]] = current;
    }

    return prev;
  }, {});
};
