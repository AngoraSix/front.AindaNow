import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import React from 'react';
import FormSkeleton from '../../components/common/Skeletons/FormSkeleton.component';
import ManageProject from '../../components/Project/ManageProject';
import { useActiveSession } from '../../hooks/oauth';
import DefaultLayout from '../../layouts/DefaultLayout';
import logger from '../../utils/logger';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
      <ManageProject />
    </DefaultLayout>
  );
};

NewProjectPage.defaultProps = {};

NewProjectPage.propTypes = {};

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      session: await getSession(ctx),
      ...(await serverSideTranslations(ctx.locale, ['common', 'projects.edit'])),
    },
  };
};

export default NewProjectPage;
