import React from 'react';

const OAuthCallback = () => {
  // const [search, setSearch] = useState('');

  // const onSearchChange = ({ target: { value } }) => {
  //   setSearch(value);

  //   onSearch(value);
  // };

  return (
    <div className="OAuthCallback OAuthCallback__Container">
      {/* <div className="OAuthCallback__Toolbar">
        <div className="OAuthCallback__Toolbar__Column">
          <div>
            Mostrando {vehicles.length} de {total}
          </div>
        </div>
        <div className="OAuthCallback__Toolbar__Column" />
        <div className="OAuthCallback__Toolbar__Column">
          <FieldMaker
            label="Buscar"
            value={search}
            type="text"
            onChange={onSearchChange}
          />
        </div>
      </div>

      <div className="OAuthCallback__Content">
        <div className="OAuthCallback__Grid">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {total > vehicles.length && (
          <div className="OAuthCallback__LoadMore">
            <Button
              variant="outlined"
              color="primary"
              onClick={onNextPageClick}
            >
              Mostrar más
            </Button>
          </div>
        )}
      </div> */}
    </div>
  );
};

OAuthCallback.defaultProps = {
  total: 0,
  vehicles: [],
};

OAuthCallback.propTypes = {
  // total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // onNextPageClick: PropTypes.func.isRequired,
  // onSearch: PropTypes.func.isRequired,
  // vehicles: PropTypes.array,
};

export default OAuthCallback;
