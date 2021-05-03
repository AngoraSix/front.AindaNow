const OAUTH_SETUP = 'OAUTH/OAUTH_LOAD';
// const COMPANIES_SELECT_COMPANY = 'COMPANIES/COMPANIES_SELECT_COMPANY';
// const COMPANIES_UPDATE_COMPANY = 'COMPANIES/COMPANIES_UPDATE_COMPANY';

// ACTIONS
export const setupOAuthContext = (payload) => ({
  type: OAUTH_SETUP,
  payload,
});
// export const selectCompanyAction = (payload) => ({
//   type: COMPANIES_SELECT_COMPANY,
//   payload,
// });
// export const updateCompanyAction = (payload) => ({
//   type: COMPANIES_UPDATE_COMPANY,
//   payload,
// });

const INITIAL_STATE = {
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({})
};

const OAuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OAUTH_SETUP:
      return {
        ...state,
        oauthContext: action.payload,
      };
    // case COMPANIES_SELECT_COMPANY:
    //   return {
    //     ...state,
    //     selectedCompany: action.payload,
    //   };
    // case COMPANIES_UPDATE_COMPANY: {
    //   let companies = [...state.companies];

    //   const companyIndex = companies.findIndex(
    //     ({ id }) => id === action.payload.id
    //   );

    //   if (companyIndex >= 0) {
    //     const companyUpdated = {
    //       ...state.companies[companyIndex],
    //       ...action.payload,
    //     };
    //     companies[companyIndex] = companyUpdated;
    //   }

    //   return {
    //     ...state,
    //     companies,
    //   };
    // }

    default:
      return state;
  }
};

export default OAuthReducer;
