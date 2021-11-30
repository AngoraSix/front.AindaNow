import {
  AppBar,
  Box,
  Button,
  Container,
  LinearProgress,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import config from '../../config';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <React.Fragment>
      <LinearProgress className="Navbar__ProgressBar" color="primary" />

      <AppBar className="Navbar Navbar__Container" position="fixed">
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <img
                className="Navbar__Logo"
                src={config.site.head.image.logo}
                alt="AngoraSix"
                title="AngoraSix"
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem key="page1">
                  <Link href="/">
                    <Typography
                      textAlign="center"
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      Projects
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem key="page2">
                  <Typography textAlign="center">MENU 2</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <img
                className="Navbar__Logo"
                src={config.site.head.image.logo}
                alt="AngoraSix"
                title="AngoraSix"
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link href={'/'}>
                <Button
                  className="Navbar__Menu__Item"
                  variant="text"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Projects
                </Button>
              </Link>
              <Button
                key="page2"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                MENU 2
              </Button>
            </Box>

            {session ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                    size="large"
                  >
                    <Avatar
                      alt="User Profile image"
                      src={session.user?.image}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Link href={`/profile/${session.user?.uid}`}>
                    <MenuItem key="profile">
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem key="logout" onClick={() => signOut()}>
                    <Typography textAlign="center">Log out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <Button
                    onClick={() => signIn('angorasixkeycloak')}
                    variant="contained"
                    color="secondary"
                    alt="login"
                  >
                    Log In
                  </Button>
                </Tooltip>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Another Toolbar just to fit the fixed position of Navbar */}
      <Toolbar />
    </React.Fragment>
  );
};

Navbar.propTypes = {};

export default Navbar;
