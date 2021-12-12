import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { COMFORT_ITEMS } from '../../../constants';
import { arrayToMapHelper } from '../../../utils/helpers';

const COMFORT_ITEMS_MAP = arrayToMapHelper(COMFORT_ITEMS);

const VehicleComfortItem = ({ itemId }) => (
  <div className="VehicleData__ComfortItems__Item">
    {COMFORT_ITEMS_MAP[itemId] ? COMFORT_ITEMS_MAP[itemId].label : itemId}
  </div>
);

VehicleComfortItem.propTypes = {
  itemId: PropTypes.string.isRequired,
};

const VehicleComfortItemsSection = ({ vehicle }) => {
  const elements = vehicle.comfortItems || [];
  return (
    <div className="VehicleData__ComfortItems">
      <Typography variant="subtitle1" color="primary">
        Elementos de Confort
      </Typography>
      <div className="VehicleData__ComfortItems__Content">
        {elements.map((itemId, i) => (
          <VehicleComfortItem
            itemId={itemId}
            key={`vehicle-comfort-item#${i}`}
          />
        ))}

        {!elements.length && (
          <div className="VehicleData__ComfortItems__EmptyMessage">
            Sin datos
          </div>
        )}
      </div>
    </div>
  );
};

VehicleComfortItemsSection.defaultProps = {};

VehicleComfortItemsSection.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleComfortItemsSection;
