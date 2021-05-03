import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../config';
import DefaultLayout from '../DefaultLayout';
import CompanyData from './CompanyData.component';

const CompanyVehiclesLayout = ({ company, children }) => {
  const { query } = useRouter();

  const withLayout = !query[config.site.queryParams.listingWithoutLayout];

  const LayoutComponent = withLayout ? DefaultLayout : React.Fragment;

  let headData = {};
  if (company) {
    headData = {
      title: `${company.name} - ParaConcesionarias`,
      description: `Todos los vehículos de ${company.name}`,
    };
    if (!!company.images && !!company.images.length)
      headData.image = { logo: company.images[0] };
  }

  return (
    <LayoutComponent headData={headData}>
      {!!company && withLayout && (
        <div className="Vehicles__CompanyData">
          <CompanyData company={company} />
        </div>
      )}

      {children}
    </LayoutComponent>
  );
};

CompanyVehiclesLayout.defaultProps = {
  company: null,
};

CompanyVehiclesLayout.propTypes = {
  company: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CompanyVehiclesLayout;
