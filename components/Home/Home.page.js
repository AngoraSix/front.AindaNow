import Button from '@material-ui/core/Button';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';
import LandingLayout from '../../layouts/LandingLayout';

const Home = () => {
  const [session, loading] = useSession();

  console.log('JUJUJU GER1');
  console.log(process.env.A6_APP_OAUTH_CLIENT_SECRET);
  return (
    <LandingLayout className="Home Home__Container">
      <img
        src="/logos/paraconcesionarias2-largo-blanco.png"
        alt="Para Concesionarias"
      />
      {!session ? (
        <Button
          onClick={() => signIn('angorasixkeycloak')}
          variant="outlined"
          color="primary"
          alt="Para Concesionarias"
        >
          Iniciar Sesion
        </Button>
      ) : (
        <Button
          onClick={() => signOut()}
          variant="outlined"
          color="primary"
          alt="Para Concesionarias"
        >
          Chau {session.user.email}
        </Button>
      )}
    </LandingLayout>
  );
};

// <Button
//   href={config.site.links.adminHome}
//   variant="outlined"
//   color="primary"
//   alt="Para Concesionarias"
// >
//   Administrar mi concesionaria
// </Button>

export default Home;
