import { Button } from '@material-ui/core';
import React from 'react';

const Login = ({ modalRef, user, onLoginClick }) => {
  // const [search, setSearch] = useState('');

  // const onSearchChange = ({ target: { value } }) => {
  //   setSearch(value);

  //   onSearch(value);
  // };

  return (
    <div className="Login Login__Container">
      {modalRef && <div className="Login Login__Spinner">LOADING...</div>}
      {user ? (
        <div className="Login Login__UserInfo">Usuario Logeado</div>
      ) : (
        <div className="Login Login__Button">
          <Button onClick={onLoginClick}>Iniciar sesion</Button>
        </div>
      )}
      {/* <div className="Login__Toolbar">
        <div className="Login__Toolbar__Column">
          <div>
            Mostrando {vehicles.length} de {total}
          </div>
        </div>
        <div className="Login__Toolbar__Column" />
        <div className="Login__Toolbar__Column">
          <FieldMaker
            label="Buscar"
            value={search}
            type="text"
            onChange={onSearchChange}
          />
        </div>
      </div>

      <div className="Login__Content">
        <div className="Login__Grid">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {total > vehicles.length && (
          <div className="Login__LoadMore">
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

Login.defaultProps = {
  total: 0,
  vehicles: [],
};

Login.propTypes = {
  // total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // onNextPageClick: PropTypes.func.isRequired,
  // onSearch: PropTypes.func.isRequired,
  // vehicles: PropTypes.array,
};

export default Login;
