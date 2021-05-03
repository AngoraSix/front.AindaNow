import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import VehicleCard from '../VehicleCard';
import FieldMaker from 'react-mui-fieldmaker';

const VehiclesList = ({ total, vehicles, onNextPageClick, onSearch }) => {
  const [search, setSearch] = useState('');

  const onSearchChange = ({ target: { value } }) => {
    setSearch(value);

    onSearch(value);
  };

  return (
    <div className="VehiclesList VehiclesList__Container">
      <div className="VehiclesList__Toolbar">
        <div className="VehiclesList__Toolbar__Column">
          <div>
            Mostrando {vehicles.length} de {total}
          </div>
        </div>
        <div className="VehiclesList__Toolbar__Column" />
        <div className="VehiclesList__Toolbar__Column">
          <FieldMaker
            label="Buscar"
            value={search}
            type="text"
            onChange={onSearchChange}
          />
        </div>
      </div>

      <div className="VehiclesList__Content">
        <div className="VehiclesList__Grid">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {total > vehicles.length && (
          <div className="VehiclesList__LoadMore">
            <Button
              variant="outlined"
              color="primary"
              onClick={onNextPageClick}
            >
              Mostrar más
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

VehiclesList.defaultProps = {
  total: 0,
  vehicles: [],
};

VehiclesList.propTypes = {
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onNextPageClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  vehicles: PropTypes.array,
};

export default VehiclesList;
