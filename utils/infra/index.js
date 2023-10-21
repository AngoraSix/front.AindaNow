import { obtainGoogleHeaders } from './googleInfra';

export const obtainInfraHeaders = async (infraConfigs, baseUrl) => {
  console.log('GERGER 0 - INFRA');
  console.log(infraConfigs);
  if (infraConfigs.isGoogleCloudRun) {
    return await obtainGoogleHeaders(baseUrl);
  }
  return {};
};
