import Button from '@mui/material/Button';
import { signIn, signOut, useSession } from 'next-auth/client';
import React from 'react';
import LandingLayout from '../../layouts/LandingLayout';

const Home = () => {
  const [session, loading] = useSession();
  return (
    <LandingLayout className="Home Home__Container">
      <img
        src="/logos/a6-white-500.png"
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
