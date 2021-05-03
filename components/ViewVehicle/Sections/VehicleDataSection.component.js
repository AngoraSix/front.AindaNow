import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FUEL_TYPES, TRANSMISSIONS } from '../../../constants';
import { arrayToMapHelper } from '../../../utils/helpers';

const FUEL_TYPES_MAP = arrayToMapHelper(FUEL_TYPES);
const TRANSMISSIONS_MAP = arrayToMapHelper(TRANSMISSIONS);

const VehicleDataSectionGroup = ({ label, value, light }) => (
  <div className="VehicleData__Group">
    <div className="VehicleData__Group__Label">{label}</div>
    <div
      className={classnames('VehicleData__Group__Value', {
        'VehicleData__Group__Value--light': light,
        'VehicleData__Group__Value--noData': !value,
      })}
    >
      {value || '-'}
    </div>
  </div>
);

VehicleDataSectionGroup.propTypes = {
  light: false,
  value: null,
};

VehicleDataSectionGroup.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  light: PropTypes.bool,
};

const VehicleDataSection = ({ vehicle }) => (
  <div className="VehicleData__Data">
    <div className="VehicleData__Row">
      <VehicleDataSectionGroup label="Tipo" value={vehicle.vehicleType.name} />
      <VehicleDataSectionGroup label="Marca" value={vehicle.brand.name} />
      <VehicleDataSectionGroup label="Modelo" value={vehicle.model} />
    </div>
    <div className="VehicleData__Row">
      <VehicleDataSectionGroup label="Versión" value={vehicle.version} />
      <VehicleDataSectionGroup label="Año" value={vehicle.year} />
      <VehicleDataSectionGroup label="Puertas" value={vehicle.doors} />
    </div>
    <div className="VehicleData__Row">
      <VehicleDataSectionGroup label="Color" value={vehicle.color} />
      <VehicleDataSectionGroup
        label="Dirección"
        value={vehicle.steering.label}
      />
      <VehicleDataSectionGroup
        label="0Km"
        value={vehicle.is0km ? 'Si' : 'No'}
      />
    </div>
    <div className="VehicleData__Row">
      <VehicleDataSectionGroup
        label="Kilometraje"
        value={
          vehicle.mileage
            ? `${vehicle.mileage.value} ${vehicle.mileage.unit}`
            : null
        }
      />
      <VehicleDataSectionGroup
        label="Motor"
        value={vehicle.engine ? vehicle.engine.displacement : null}
      />
      <VehicleDataSectionGroup
        label="Caja"
        value={
          TRANSMISSIONS_MAP[vehicle.transmission]
            ? TRANSMISSIONS_MAP[vehicle.transmission].label
            : vehicle.transmission
        }
      />
    </div>
    <div className="VehicleData__Row">
      <VehicleDataSectionGroup
        label="Combustible"
        value={
          FUEL_TYPES_MAP[vehicle.fuelType]
            ? FUEL_TYPES_MAP[vehicle.fuelType].label
            : vehicle.fuelType
        }
      />
      <VehicleDataSectionGroup label="GNC" value={vehicle.gnc ? 'Si' : 'No'} />
      <VehicleDataSectionGroup
        label="Precio"
        value={
          vehicle.price
            ? `${vehicle.currency.shortLabel}${vehicle.price} (${vehicle.currency.id})`
            : '-'
        }
      />
    </div>
    <div className="VehicleData__Row VehicleData__Row--full">
      <VehicleDataSectionGroup
        label="Descripción"
        value={vehicle.description}
        light
      />
    </div>
  </div>
);

VehicleDataSection.defaultProps = {};

VehicleDataSection.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default VehicleDataSection;
