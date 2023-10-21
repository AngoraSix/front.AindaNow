import { obtainGoogleHeaders } from './googleInfra';

export const obtainInfraHeaders = async (infraConfigs, baseUrl) => {
  if (infraConfigs.isGoogleCloudRun) {
    return await obtainGoogleHeaders(baseUrl);
  }
  return {};
};
