import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import FormSkeleton from '../../components/common/Skeletons/FormSkeleton.component';
import ManageProject from '../../components/Project/ManageProject';
import { useActiveSession } from '../../hooks/oauth';
import DefaultLayout from '../../layouts/DefaultLayout';
import logger from '../../utils/logger';

const NewProjectPage = ({ session }) => {
  const { t } = useTranslation('projects.edit');
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
    <DefaultLayout
      headData={{
        title: t('projects.new.page.title'),
        description: t('projects.new.page.description'),
      }}
    >
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
      ...(await serverSideTranslations(ctx.locale, [
        'common',
        'projects.edit',
        'project-presentations.edit',
        'common.languages',
      ])),
    },
  };
};

export default NewProjectPage;
