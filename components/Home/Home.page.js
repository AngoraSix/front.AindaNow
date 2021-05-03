import Button from '@material-ui/core/Button';
import React from 'react';
import config from '../../config';
import LandingLayout from '../../layouts/LandingLayout';

const Home = () => {
  return (
    <LandingLayout className="Home Home__Container">
      <img src="/logos/paraconcesionarias2-largo-blanco.png" alt="Para Concesionarias" />
      <Button
        href={config.site.links.adminHome}
        variant="outlined"
        color="primary"
        alt="Para Concesionarias"
      >
        Administrar mi concesionaria
      </Button>
    </LandingLayout>
  );
};

export default Home;
