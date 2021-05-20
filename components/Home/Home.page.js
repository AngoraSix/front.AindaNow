import Button from '@material-ui/core/Button';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';
import oauthConfig from '../../config/oauth';
import LandingLayout from '../../layouts/LandingLayout';

const Home = () => {
  const [session, loading] = useSession();
  console.log(oauthConfig.clientSecret);
  return (
    <LandingLayout className="Home Home__Container">
      <img
        src="/logos/paraconcesionarias2-largo-blanco.png"
        alt="AngoraSix"
      />
      {!session ? (
        <Button
          onClick={() => signIn('angorasixkeycloak')}
          variant="contained"
          color="secondary"
          alt="AngoraSix"
        >
          Iniciar Sesion
        </Button>
      ) : (
        <Button
          onClick={() => signOut()}
          variant="contained"
          color="secondary"
          alt="AngoraSix"
        >
          Chau {session.user.email}
        </Button>
      )}
    </LandingLayout>
  );
};

export default Home;
