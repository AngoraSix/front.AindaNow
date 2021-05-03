class CompaniesAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async getCompanyById(id) {
    const { data } = await this.axios.get(`/open/company/${id}`);
    return data;
  }
}

export default CompaniesAPI;
