import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import api from '../../../../api';
import CompanyVehiclesLayout from '../../../../layouts/CompanyVehiclesLayout';
import ViewVehicle from '../../../../components/ViewVehicle';
import { VEHICLE_STEERINGS } from '../../../../constants';

const CompanyVehicleDetail = ({ company, vehicle }) => {
  const reduxState = useSelector(({ brands, vehicleTypes, currencies }) => ({
    brands: brands.map,
    vehicleTypes: vehicleTypes.map,
    currencies: currencies.map,
  }));

  let fulfilledVehicle = null;
  if (vehicle) {
    fulfilledVehicle = {
      ...vehicle,
      brand: reduxState.brands[vehicle.brand],
      vehicleType: reduxState.vehicleTypes[vehicle.vehicleType],
      currency: reduxState.currencies[vehicle.currency],
      steering: VEHICLE_STEERINGS.find(({ id }) => id === vehicle.steering) || {},
    };
  }

  return (
    <CompanyVehiclesLayout company={company}>
      <ViewVehicle vehicle={fulfilledVehicle} />
    </CompanyVehiclesLayout>
  );
};

CompanyVehicleDetail.defaultProps = {
  company: null,
  vehicle: null,
};

CompanyVehicleDetail.propTypes = {
  company: PropTypes.object,
  vehicle: PropTypes.object,
};

export const getServerSideProps = async (ctx) => {
  let props = {};

  const { companyId, vehicleId }= ctx.params;
  try {
    const company = await api.companies.getCompanyById(companyId);

    const vehicle = await api.vehicles.getCompanyVehicleById(
      companyId,
      vehicleId
    );

    props = {
      ...props,
      company,
      vehicle,
    };
  } catch (err) {
    console.log('err', err);
  }

  return {
    props,
  };
};

export default CompanyVehicleDetail
