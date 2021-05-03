class VehiclesAPI {
  constructor(axiosInstance) {
    this.axios = axiosInstance;
  }

  async _listEndpoint(
    endpoint,
    { search = '', limit = 10, page = 1, sort = '-_id' } = {}
  ) {
    return this.axios.get(
      `${endpoint}?search=${search}&limit=${limit}&page=${page}&sort=${sort}`
    );
  }

  async listBrands({ search = '', limit = 10, page = 1, sort = '-_id' } = {}) {
    const { data } = await this._listEndpoint(`/open/brands`, {
      search,
      limit,
      page,
      sort,
    });
    return data;
  }

  async listVehicleTypes({ search = '', limit = 10, page = 1, sort = '-_id' }) {
    const { data } = await this._listEndpoint(`/open/vehicle-types`, {
      search,
      limit,
      page,
      sort,
    });
    return data;
  }

  async listCompanyVehicles(
    companyId,
    { search = '', limit = 10, page = 1, sort = '-_id' } = {}
  ) {
    const { data } = await this._listEndpoint(
      `/open/company/${companyId}/vehicles`,
      {
        search,
        limit,
        page,
        sort,
      }
    );
    return data;
  }

  async getCompanyVehicleById(companyId, vehicleId) {
    const { data } = await this.axios.get(
      `/open/company/${companyId}/vehicles/${vehicleId}`
    );
    return data;
  }
}

export default VehiclesAPI;
