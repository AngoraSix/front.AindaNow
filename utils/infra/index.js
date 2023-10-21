import { obtainGoogleHeaders } from './googleInfra';

export const obtainInfraHeaders = async (infraConfigs, baseUrl, headers) => {
  console.log("GERGER 0 - INFRA");
  console.log(infraConfigs);
  if (infraConfigs.isGoogleCloudRun) {
    return await obtainGoogleHeaders(baseUrl, headers);
  }
  return {};
};
