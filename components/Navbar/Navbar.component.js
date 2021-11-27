import { AppBar, Button, LinearProgress, Toolbar, Avatar } from '@material-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';
import config from '../../config';
import UserIcon from '@material-ui/icons/Person';

const Navbar = () => {
  const [session, loading] = useSession();
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
                alt="login"
              >
                Log In
              </Button>
            ) : (
              <React.Fragment>
                <Link href={`/profile/${session.user.id}`}>
                  <Avatar alt="Profile" src={session.user.image}>
                    <UserIcon />
                  </Avatar>
                </Link>
                <Button
                  onClick={() => signOut()}
                  variant="contained"
                  color="secondary"
                  alt="logout"
                >
                  Log Out
                </Button>
              </React.Fragment>
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
