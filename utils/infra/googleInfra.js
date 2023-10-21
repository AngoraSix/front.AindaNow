import { GoogleAuth } from 'google-auth-library';

export const obtainGoogleHeaders = async (axiosInstance) => {
  console.log("GER 1 - It's GCP");
  console.log(axiosInstance.serverBaseURL);
  const auth = new GoogleAuth();
  const client = await auth.getIdTokenClient(axiosInstance.serverBaseURL);
  console.log('GER 2');
  console.log(client.idTokenProvider?.fetchIdToken);
  return {
    'X-Serverless-Authorization': client.idTokenProvider?.fetchIdToken,
  };
};
