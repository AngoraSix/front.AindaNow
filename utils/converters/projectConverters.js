import { createObjectWithFlatParams } from '../helpers';

export const projectToForm = (projectObject = {}) => {
  return createObjectWithFlatParams(projectObject);
};
