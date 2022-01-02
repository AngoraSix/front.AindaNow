import React from 'react';
import LoginRequiredMessage from '../../components/common/Messages/LoginRequiredMessage';
import DefaultLayout from '../../layouts/DefaultLayout';
import NewProjectContainer from '../../components/Project/NewProject';
import { signIn, getSession } from 'next-auth/react';
import { useActiveSession } from '../../hooks/oauth';
import { useEffect } from 'react';

const NewProjectPage = ({ session }) => {
  useActiveSession();

  if (!session || session.error) {
    return <LoginRequiredMessage message="Log in to create new project" />;
  }
  return (
    <DefaultLayout>
      <NewProjectContainer />
    </DefaultLayout>
  );
};

NewProjectPage.defaultProps = {};

NewProjectPage.propTypes = {};

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
};

export default NewProjectPage;
