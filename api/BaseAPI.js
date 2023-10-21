import axios from 'axios';
import TokenRequiredError from '../utils/errors/TokenRequiredError';
import { GoogleAuth } from 'google-auth-library';

class BaseAPI {
  constructor({ browserBaseURL = null, serverBaseURL = null, baseURL = null, infraConfigs }) {
    if (!browserBaseURL && !serverBaseURL && !baseURL) {
      throw new Error(
        'BaseAPI Error - You should set at least baseURL (or browserBaseURL and serverBaseURL)'
      );
    }

    this.axiosBrowser = axios.create({
      baseURL: browserBaseURL || baseURL,
    });

    this.axiosServer = axios.create({
      baseURL: serverBaseURL || baseURL,
    });
    this.isGoogleCloudRun = infraConfigs.isGoogleCloudRun;
    this.serverBaseURL = serverBaseURL;
  }

  setCommonHeaders(headers) {
    this.axiosBrowser.defaults.headers.common = {
      ...this.axiosBrowser.defaults.headers.common,
      ...headers,
    };
    this.axiosServer.defaults.headers.common = {
      ...this.axiosServer.defaults.headers.common,
      ...headers,
    };
  }

  getCommonHeaders() {
    return this.getCurrentAxiosInstance().defaults.headers.common;
  }

  getBaseURL() {
    return this.getCurrentAxiosInstance().defaults.baseURL;
  }

  getDefaults() {
    return this.getCurrentAxiosInstance().defaults;
  }

  getAuthorizationHeaders = async (token, isRequired = true) => {
    const authHeaders = {};
    if (token?.accessToken) {
      authHeaders.Authorization= `Bearer ${token.accessToken}`;
    } else if (isRequired) {
      throw new TokenRequiredError(
        'BaseAPI Error - Authorization header is required but user is not authenticated'
      );
    }

    console.log("GER 0");
    
    if(this.isGoogleCloudRun){
      console.log("GER 1 - It's GCP");
      console.log(this.serverBaseURL);
      const auth = new GoogleAuth();
      const client = await auth.getIdTokenClient(this.serverBaseURL);
      console.log("GER 2");
      console.log(client.idTokenProvider?.fetchIdToken);
      authHeaders['X-Serverless-Authorization'] = client.idTokenProvider?.fetchIdToken;
    }
    
    return authHeaders;
  };

  getCurrentAxiosInstance() {
    const axiosInstance =
      typeof window !== 'undefined' ? this.axiosBrowser : this.axiosServer;
    return axiosInstance;
  }

  async _executeRequest(type = 'request', ...args) {
    const axiosInstance = this.getCurrentAxiosInstance();
    return axiosInstance[type](...args);
  }

  // axios.request(config)
  async request(...args) {
    return this._executeRequest('request', ...args);
  }

  // axios.get(url[, config])
  async get(...args) {
    return this._executeRequest('get', ...args);
  }

  // axios.delete(url[, config])
  async delete(...args) {
    return this._executeRequest('delete', ...args);
  }

  // axios.head(url[, config])
  async head(...args) {
    return this._executeRequest('head', ...args);
  }

  // axios.options(url[, config])
  async options(...args) {
    return this._executeRequest('options', ...args);
  }

  // axios.post(url[, data[, config]])
  async post(...args) {
    return this._executeRequest('post', ...args);
  }

  // axios.put(url[, data[, config]])
  async put(...args) {
    return this._executeRequest('put', ...args);
  }

  // axios.patch(url[, data[, config]])
  async patch(...args) {
    return this._executeRequest('patch', ...args);
  }
}

export default BaseAPI;
