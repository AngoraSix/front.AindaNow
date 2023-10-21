import { obtainGoogleHeaders } from './googleInfra';

export const obtainInfraHeaders = async (infraConfigs, axiosInstance) => {
  console.log("GERGER 0 - INFRA");
  console.log(infraConfigs);
  if (infraConfigs.isGoogleCloudRun) {
    return obtainGoogleHeaders(axiosInstance);
  }
  return {};
};
