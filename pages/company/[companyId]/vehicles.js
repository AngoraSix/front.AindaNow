import PropTypes from 'prop-types';
import api from '../../../api';
import VehiclesList from '../../../components/VehiclesList';
import CompanyVehiclesLayout from '../../../layouts/CompanyVehiclesLayout/CompanyVehiclesLayout';

const CompanyVehiclesList = ({ company, data }) => {
  return (
    <CompanyVehiclesLayout company={company}>
      <VehiclesList data={data} />
    </CompanyVehiclesLayout>
  );
};

CompanyVehiclesList.defaultProps = {
  company: null,
};

CompanyVehiclesList.propTypes = {
  company: PropTypes.object,
};

export const getServerSideProps = async (ctx) => {
  let props = {};

  const { companyId }= ctx.params;
  try {
    const company = await api.companies.getCompanyById(companyId);

    const vehiclesListData = await api.vehicles.listCompanyVehicles(companyId);

    props = {
      ...props,
      company,
      data: {
        ...vehiclesListData,
        vehicles: vehiclesListData.data || [],
      },
    };
  } catch (err) {
    console.log('err', err);
  }

  return {
    props,
  };
};

export default CompanyVehiclesList
