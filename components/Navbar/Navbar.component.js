import { AppBar, Button, LinearProgress, Toolbar } from '@material-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';
import config from '../../config';

const Navbar = () => {
  const [session, loading] = useSession();
  console.log(session && session.user);
  return (
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

          <div className="Navbar__Column Navbar__User">
            {session && session.user ? session.user.name : ''}
          </div>

          <div className="Navbar__Column Navbar__MenuLogin">
            {!session ? (
              <Button
                onClick={() => signIn('angorasixkeycloak')}
                variant="contained"
                color="secondary"
                alt="AngoraSix"
              >
                Log In
              </Button>
            ) : (
              <Button
                onClick={() => signOut()}
                variant="contained"
                color="secondary"
                alt="AngoraSix"
              >
                Log Out
              </Button>
            )}
          </div>

          {/* <div className="Navbar__Column Navbar__MenuIcon"></div> */}
        </Toolbar>
      </AppBar>

      {/* Another Toolbar just to fit the fixed position of Navbar */}
      <Toolbar />
    </React.Fragment>
  );
};

Navbar.propTypes = {};

export default Navbar;
