import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import api from '../../../api';
import FormSkeleton from '../../../components/common/Skeletons/FormSkeleton.component';
import { resolveRoute, ROUTES } from '../../../constants';
import DefaultLayout from '../../../layouts/DefaultLayout';
import { resolveLocale } from '../../../utils/api/apiHelper';
import logger from '../../../utils/logger';

const ProjectViewPage = ({}) => {
  const { t } = useTranslation('projects.view');
  return (
    <DefaultLayout>
      <Box>
        <FormSkeleton />
      </Box>
    </DefaultLayout>
  );
};

ProjectViewPage.defaultProps = {};

ProjectViewPage.propTypes = {};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  try {
    const project = await api.projects.getProject(projectId, validatedToken);

    const projectPresentationId = project.presentations?.[0]?.id;
    const destination = projectPresentationId
      ? resolveRoute(
          ROUTES.projects.presentations.view,
          project.id,
          projectPresentationId
        )
      : resolveRoute(ROUTES.projects.presentations.list);

    const i18nDestination = resolveLocale(destination, ctx);

    return {
      redirect: {
        permanent: false,
        destination: i18nDestination,
      },
    };
  } catch (err) {
    logger.error('err', err);
  }

  return {
    props: {
      ...props,
      session,
      ...(await serverSideTranslations(ctx.locale, [
        'common',
        'projects.view',
      ])),
    },
  };
};

export default ProjectViewPage;
