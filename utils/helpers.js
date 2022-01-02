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

const _mapFlatParam = ([field, value]) => {
  if (!field.includes('.')) {
    return {
      [field]: value,
    };
  } else {
    let separatorIndex = field.indexOf('.'),
      [singleParam, flatParam] = [
        field.slice(0, separatorIndex),
        field.slice(separatorIndex + 1),
      ];
    return {
      [singleParam]: _mapFlatParam([flatParam, value]),
    };
  }
};

export function _isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function _mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (_isObject(target) && _isObject(source)) {
    for (const key in source) {
      if (_isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        _mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return _mergeDeep(target, ...sources);
}

export const createObjectFromFlatParams = (flatObject) => {
  return Object.entries(flatObject)
    .filter(([, value]) => (Array.isArray(value) ? value.length : !!value))
    .reduce((output, field) => _mergeDeep(output, _mapFlatParam(field)), {});
};
