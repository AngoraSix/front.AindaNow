import { AppBar, LinearProgress, Toolbar } from '@material-ui/core';
import React from 'react';
import Login from '../Login';

const Navbar = () => (
  <React.Fragment>
    <LinearProgress className="Navbar__ProgressBar" color="primary" />

    <AppBar className="Navbar Navbar__Container" position="fixed">
      <Toolbar>
        <div className="Navbar__Column Navbar__CompanySelector__Container">
          {/* <img
            className="Navbar__Logo"
            src={config.site.head.image.logo}
            alt="Para Concesionarias"
            title="paraConcesionarias"
          /> */}
        </div>
        {/* <div className="Navbar__Column" />

        <div className="Navbar__Column Navbar__User"></div>

        <div className="Navbar__Column Navbar__MenuIcon"></div> */}
        <div className="Navbar__Column Navbar__Login">
          <Login />
        </div>
      </Toolbar>
    </AppBar>

    {/* Another Toolbar just to fit the fixed position of Navbar */}
    <Toolbar />
  </React.Fragment>
);

Navbar.propTypes = {};

export default Navbar;
