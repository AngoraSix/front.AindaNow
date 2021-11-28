import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import routes from '../../../routes';
import { isMaster } from '../../../utils/helpers';

const MenuListItem = ({ label, icon: ItemIcon, to, onClick, props }) => (
  <ListItem
    button
    className="Menu__List__Item"
    component={NavLink}
    to={Array.isArray(to) ? to[0] : to}
    onClick={onClick}
    {...props}
  >
    {!!ItemIcon && (
      <ListItemIcon>
        <ItemIcon />
      </ListItemIcon>
    )}
    <ListItemText primary={label} />
  </ListItem>
);

MenuListItem.defaultProps = {
  onClick: () => {},
  props: {},
};

MenuListItem.propTypes = {
  onClick: PropTypes.func,
  props: PropTypes.object,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

const Menu = ({ user, companies, onItemClick }) => {
  const menuRoutes = React.useMemo(() => {
    const filteredRoutes = {
      master: [],
      others: [],
      config: [],
    };

    Object.values(routes).forEach((route) => {
      if (route.menu) {
        filteredRoutes[route.group || 'others'].push(route);
      }
    });

    return filteredRoutes;
  });

  return (
    <div className="Menu__Content">
      <List component="div" className="Menu__List">
        {isMaster(user) && !!menuRoutes.master.length && (
          <React.Fragment>
            {menuRoutes.master.map((route, index) => (
              <MenuListItem key={index} onClick={onItemClick} {...route} />
            ))}
            <Divider />
          </React.Fragment>
        )}

        {!!companies.selectedCompany &&
          menuRoutes.others.map((route, index) => (
            <MenuListItem key={index} onClick={onItemClick} {...route} />
          ))}
      </List>

      {!companies.selectedCompany && (
        <div className="Menu__SelectCompanyMessage">
          Seleccione una empresa para acceder al menú.
        </div>
      )}

      <List component="div" className="Menu__ConfigList">
        {menuRoutes.config.map((route, index) => (
          <MenuListItem key={index} onClick={onItemClick} {...route} />
        ))}
      </List>
    </div>
  );
};

Menu.defaultProps = {
  onItemClick: () => {},
};

Menu.propTypes = {
  onItemClick: PropTypes.func,
  user: PropTypes.object.isRequired,
  companies: PropTypes.object.isRequired,
};

export default Menu;
