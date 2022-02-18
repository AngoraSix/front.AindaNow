import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import React from 'react';
import FormSkeleton from '../../components/common/Skeletons/FormSkeleton.component';
import NewProjectContainer from '../../components/Project/NewProject';
import { useActiveSession } from '../../hooks/oauth';
import DefaultLayout from '../../layouts/DefaultLayout';
import logger from '../../utils/logger';

const NewProjectPage = ({ session }) => {
  useActiveSession();

  if (!session || session.error) {
    logger.error('Log in to create new project');
    return (
      <DefaultLayout>
        <Box>
          <FormSkeleton />
        </Box>
      </DefaultLayout>
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
