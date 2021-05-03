const COMPANIES_LOAD = 'COMPANIES/COMPANIES_LOAD';
const COMPANIES_SELECT_COMPANY = 'COMPANIES/COMPANIES_SELECT_COMPANY';
const COMPANIES_UPDATE_COMPANY = 'COMPANIES/COMPANIES_UPDATE_COMPANY';

// ACTIONS
export const loadCompaniesAction = (payload) => ({
  type: COMPANIES_LOAD,
  payload,
});
export const selectCompanyAction = (payload) => ({
  type: COMPANIES_SELECT_COMPANY,
  payload,
});
export const updateCompanyAction = (payload) => ({
  type: COMPANIES_UPDATE_COMPANY,
  payload,
});

const INITIAL_STATE = {
  companies: [],
  selectedCompany: null,
};

const CompaniesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMPANIES_LOAD:
      return {
        ...state,
        companies: action.payload,
      };
    case COMPANIES_SELECT_COMPANY:
      return {
        ...state,
        selectedCompany: action.payload,
      };
    case COMPANIES_UPDATE_COMPANY: {
      let companies = [...state.companies];

      const companyIndex = companies.findIndex(
        ({ id }) => id === action.payload.id
      );

      if (companyIndex >= 0) {
        const companyUpdated = {
          ...state.companies[companyIndex],
          ...action.payload,
        };
        companies[companyIndex] = companyUpdated;
      }

      return {
        ...state,
        companies,
      };
    }

    default:
      return state;
  }
};

export default CompaniesReducer;
