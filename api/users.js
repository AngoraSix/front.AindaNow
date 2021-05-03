class UsersAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  setAuthorizationToken(token) {
    this.axios.setCommonHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  async login({ user: username, password }) {
    const { data } = await this.axios.post('/users/login', {
      username,
      password,
    });

    this.setAuthorizationToken(data.jwt);

    return data;
  }

  async logout() {
    let headers = this.axios.getCommonHeaders();
    if (headers['Authorization']) {
      delete headers['Authorization'];
      this.axios.setCommonHeaders(headers);
    }
  }

  async getMe(token = null) {
    const headers = this.axios.getCommonHeaders();
    if (token || headers['Authorization']) {
      const { data } = await this.axios.get('/users/me', {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : headers['Authorization'],
        },
      });

      return data;
    }

    return null;
  }
}

export default UsersAPI;
