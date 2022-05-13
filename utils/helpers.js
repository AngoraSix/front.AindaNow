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

export const createObjectWithFlatParams = (deepObject) => {
  let result = {};
  for (const i in deepObject) {
    if (typeof deepObject[i] === 'object' && !Array.isArray(deepObject[i])) {
      const temp = createObjectWithFlatParams(deepObject[i]);
      for (const j in temp) {
        result[i + '.' + j] = temp[j];
      }
    } else {
      result[i] = deepObject[i];
    }
  }
  return result;
};

export const asArray = (potentialObject, ifNull = potentialObject) => {
  if (potentialObject != null) {
    return Array.isArray(potentialObject) ? potentialObject : [potentialObject];
  } else {
    return ifNull;
  }
};

const _createIfNotOfType = (input, Type) =>
  input instanceof Type ? input : new Type(input);

export const toType = (input, Type, toSingleElement = false) => {
  if (input == null) return input;
  if (Array.isArray(input)) {
    input = asArray(input, []);
    input = input.map((i) =>
      i instanceof Type ? i : _createIfNotOfType(i, Type)
    );
    return toSingleElement && input.length ? input[0] : input;
  } else {
    return input instanceof Type ? input : _createIfNotOfType(input, Type);
  }
};
