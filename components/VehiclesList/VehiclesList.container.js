import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import VehiclesList from './VehiclesList.component';
import VehiclesListReducer, {
  INITIAL_STATE,
  updateDataAction,
} from './VehiclesList.reducer';
import api from '../../api';

const VehiclesListContainer = ({ data }) => {
  const { query: { companyId } } = useRouter();

  const [state, dispatch] = useReducer(VehiclesListReducer, {
    ...INITIAL_STATE,
    data,
  });

  const onNextPageClick = async () => {
    const {
      total,
      page,
      limit,
      search,
      data,
    } = await api.vehicles.listCompanyVehicles(companyId, {
      page: state.data.page + 1,
      search: state.data.search,
    });

    const vehicles = state.data.vehicles.concat(data);

    dispatch(updateDataAction({ total, page, limit, search, vehicles }));
  };

  const onSearch = async (value) => {
    const {
      total,
      page,
      limit,
      search,
      data: vehicles,
    } = await api.vehicles.listCompanyVehicles(companyId, {
      search: value,
    });

    dispatch(updateDataAction({ total, page, limit, search, vehicles }));
  };

  return (
    <VehiclesList
      {...state.data}
      onNextPageClick={onNextPageClick}
      onSearch={onSearch}
    />
  );
};

VehiclesListContainer.defaultProps = {
  data: {},
};

VehiclesListContainer.propTypes = {
  data: PropTypes.object,
};

export default VehiclesListContainer;
