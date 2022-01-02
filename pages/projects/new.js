import React from 'react';
import { getSession } from 'next-auth/react';
import LoginRequiredMessage from '../../components/common/Messages/LoginRequiredMessage';
import FormSkeleton from '../../components/common/Skeletons/FormSkeleton.component';
import DefaultLayout from '../../layouts/DefaultLayout';
import NewProjectContainer from '../../components/Project/NewProject';
import { useActiveSession } from '../../hooks/oauth';
import { Box } from '@mui/material';

const NewProjectPage = ({ session }) => {
  useActiveSession();

  if (!session || session.error) {
    return (
      <Box>
        <LoginRequiredMessage message="Log in to create new project" />
        <FormSkeleton />
      </Box>
    );
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
