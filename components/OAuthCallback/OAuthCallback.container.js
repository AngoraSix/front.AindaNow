// import { useRouter } from 'next/router';
// import { setAuthCookie } from '../../utils/cookies';
// import { useOAuthContext } from '../../hooks/oauth';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../config';
import OAuthCallback from './OAuthCallback.component';

const OAuthCallbackContainer = ({accessToken}) => {
//   const { query } = useRouter();
// // const {signingRedirectCallback } = useOAuthContext();
// // signingRedirectCallback();
console.log("EN CONTAINER!");
console.log(accessToken);
console.log(config.crypto);
// setAuthCookie("asd");



  // const [state, dispatch] = useReducer(OAuthCallbackReducer, {
  //   ...INITIAL_STATE,
  //   data,
  // });

  // const onNextPageClick = async () => {
  //   const {
  //     total,
  //     page,
  //     limit,
  //     search,
  //     data,
  //   } = await api.vehicles.listCompanyVehicles(companyId, {
  //     page: state.data.page + 1,
  //     search: state.data.search,
  //   });

  //   const vehicles = state.data.vehicles.concat(data);

  //   dispatch(updateDataAction({ total, page, limit, search, vehicles }));
  // };

  // const onSearch = async (value) => {
  //   const {
  //     total,
  //     page,
  //     limit,
  //     search,
  //     data: vehicles,
  //   } = await api.vehicles.listCompanyVehicles(companyId, {
  //     search: value,
  //   });

  //   dispatch(updateDataAction({ total, page, limit, search, vehicles }));
  // };

  return (
    <OAuthCallback
      // {...state.data}
      // onNextPageClick={onNextPageClick}
      // onSearch={onSearch}
    />
  );
};

OAuthCallbackContainer.defaultProps = {
  accessToken: "bbbbb"
};

OAuthCallbackContainer.propTypes = {
  accessToken: PropTypes.string,
};

export default OAuthCallbackContainer;
