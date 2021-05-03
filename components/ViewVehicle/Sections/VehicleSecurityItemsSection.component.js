import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { SECURITY_ITEMS } from '../../../constants';
import { arrayToMapHelper } from '../../../utils/helpers';

const SECURITY_ITEMS_MAP = arrayToMapHelper(SECURITY_ITEMS);

const VehicleSecurityItem = ({ itemId }) => (
  <div className="VehicleData__SecurityItems__Item">
    {SECURITY_ITEMS_MAP[itemId] ? SECURITY_ITEMS_MAP[itemId].label : itemId}
  </div>
);

VehicleSecurityItem.propTypes = {
  itemId: PropTypes.string.isRequired,
};

const VehicleSecurityItemsSection = ({ vehicle }) => {
  const elements = vehicle.securityItems || [];
  return (
    <div className="VehicleData__SecurityItems">
      <Typography variant="subtitle1" color="primary">
        Elementos de Seguridad
      </Typography>
      <div className="VehicleData__SecurityItems__Content">
        {elements.map((itemId, i) => (
          <VehicleSecurityItem
            itemId={itemId}
            key={`vehicle-security-item#${i}`}
          />
        ))}

        {!elements.length && (
          <div className="VehicleData__SecurityItems__EmptyMessage">
            Sin datos
          </div>
        )}
      </div>
    </div>
  );
};

VehicleSecurityItemsSection.defaultProps = {};

VehicleSecurityItemsSection.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleSecurityItemsSection;
