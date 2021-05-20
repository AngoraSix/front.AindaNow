import { AppBar, LinearProgress, Toolbar } from '@material-ui/core';
import React from 'react';
import config from '../../config';

const Navbar = () => (
  <React.Fragment>
    <LinearProgress className="Navbar__ProgressBar" color="primary" />

    <AppBar className="Navbar Navbar__Container" position="fixed">
      <Toolbar>
        <div className="Navbar__Column Navbar__CompanySelector__Container">
          <img
            className="Navbar__Logo"
            src={config.site.head.image.logo}
            alt="AngoraSix"
            title="AngoraSix"
          />
        </div>
        <div className="Navbar__Column" />

        <div className="Navbar__Column Navbar__User"></div>

        <div className="Navbar__Column Navbar__MenuIcon"></div>
      </Toolbar>
    </AppBar>

    {/* Another Toolbar just to fit the fixed position of Navbar */}
    <Toolbar />
  </React.Fragment>
);

Navbar.propTypes = {};

export default Navbar;
