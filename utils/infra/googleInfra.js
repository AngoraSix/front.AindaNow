import axios from 'axios';
import logger from '../logger';

export const obtainGoogleHeaders = async (baseUrl) => {
  const headers = {};
  try {
    const { data: idToken } = await axios.get(
      `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${baseUrl}`,
      {
        headers: {
          'Metadata-Flavor': 'Google',
        },
      }
    );
    headers['X-Serverless-Authorization'] = `Bearer ${idToken}`;
  } catch (err) {
    logger.error('Error obtaining GCP Id Token', err);
  }

  return headers;
  // const auth = new GoogleAuth();
  // const client = await auth.getIdTokenClient(baseUrl);
  // console.log('GERGER 2');
  // console.log(client.idTokenProvider?.constructor?.name);
  // console.log('GERGER 2.2');

  // try {
  //   const res = await client.request({
  //     url: `${baseUrl}/projects/presentations`,
  //     headers
  //   });
  //   console.log(res.data);
  //   console.log('GERGER 2.3');
  // } catch (ex) {
  //   console.log('GERGER 2.3 ERROR');
  //   console.log(ex);
  // }

  // const idToken = await client.idTokenProvider.fetchIdToken();
  // console.log('GERGER3');
  // console.log(idToken);
  // return {
  //   'X-Serverless-Authorization': `Bearer ${idToken}`,
  // };
};
