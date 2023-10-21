import { obtainGoogleHeaders } from './googleInfra';

export const obtainInfraHeaders = async (infraConfigs, axiosInstance) => {
  if (infraConfigs.isGoogleCloudRun) {
    return obtainGoogleHeaders(axiosInstance);
  }
  return {};
};
