import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import api from '../../../../api';
import FormSkeleton from '../../../../components/common/Skeletons/FormSkeleton.component';
import ProjectPresentationForm from '../../../../components/Project/ProjectPresentation/Form';
import { resolveRoute, ROUTES } from '../../../../constants';
import { useNotifications } from '../../../../hooks/app';
import { useActiveSession } from '../../../../hooks/oauth';
import DefaultLayout from '../../../../layouts/DefaultLayout';
import logger from '../../../../utils/logger';

const NOT_ADMIN_ERROR_MESSAGE =
  'You need admin privileges to edit this Project';

const NewProjectPresentationPage = ({ session, project, isAdmin }) => {
  const { t } = useTranslation('project-presentations.edit');
  useActiveSession();
  const { onError } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.error && !isAdmin) {
      onError(NOT_ADMIN_ERROR_MESSAGE);
      const viewURL = resolveRoute(ROUTES.projects.presentations.list);
      router.push(viewURL);
    }
    return () => {};
  }, []);

  if (!session || session.error || !project || !isAdmin) {
    logger.error('Log in to modify new Project');
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
        title: t('project-presentations.new.page.title.template').replace(
          ':project',
          project.name
        ),
        description: t(
          'project-presentations.new.page.description.template'
        ).replace(':project', project.name),
      }}
    >
      <ProjectPresentationForm project={project} />
    </DefaultLayout>
  );
};

NewProjectPresentationPage.defaultProps = {
  isAdmin: false,
};

NewProjectPresentationPage.propTypes = {
  projectPresentation: PropTypes.object,
  session: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  let isAdmin = false;
  try {
    const project = await api.projects.getProject(projectId, validatedToken);
    isAdmin = session?.user.id != null && session?.user.id === project.adminId;
    props = {
      ...props,
      project,
      isAdmin,
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
        'project-presentations.edit',
        'common.languages',
      ])),
    },
  };
};

export default NewProjectPresentationPage;
