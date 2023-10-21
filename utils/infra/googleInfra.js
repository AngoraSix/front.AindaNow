import { GoogleAuth } from 'google-auth-library';

export const obtainGoogleHeaders = async (baseUrl) => {
  console.log("GERGER 1 - It's GCP");
  console.log(baseUrl);
  console.log(baseUrl + "/");
  const auth = new GoogleAuth();
  const client = await auth.getIdTokenClient(baseUrl);
  console.log('GERGER 2');
  console.log(client.idTokenProvider?.constructor?.name);
  console.log('GERGER 2.2');

  // const res = await client.request({url: `${baseUrl} + "/projects/presentations"`});
  // console.log(res.data);
  console.log('GERGER 2.3');
  
  const idToken = await client.idTokenProvider.fetchIdToken();
  console.log("GERGER3");
  console.log(idToken);
  return {
    'X-Serverless-Authorization': `Bearer ${idToken}`,
  };
};
