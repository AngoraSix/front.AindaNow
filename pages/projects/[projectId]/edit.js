import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import api from '../../../api';
import ManageProject from '../../../components/Project/ManageProject';
import FormSkeleton from '../../../components/common/Skeletons/FormSkeleton.component';
import { ROUTES } from '../../../constants';
import { useNotifications } from '../../../hooks/app';
import { useActiveSession } from '../../../hooks/oauth';
import DefaultLayout from '../../../layouts/DefaultLayout';
import { resolveRoute } from '../../../utils/api/apiHelper';
import logger from '../../../utils/logger';

const NOT_ADMIN_ERROR_MESSAGE =
  'You need admin privileges to edit this Project';

const EditProjectPage = ({ session, project, isAdmin }) => {
  const { t } = useTranslation('projects.edit');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, router, session]);

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
        title: t('projects.edit.page.title.template').replace(
          ':project',
          project.name
        ),
        description: t('projects.edit.page.description.template').replace(
          ':project',
          project.name
        ),
      }}
    >
      <ManageProject stepped={false} project={project} />
    </DefaultLayout>
  );
};

EditProjectPage.defaultProps = {
  isAdmin: false,
};

EditProjectPage.propTypes = {
  project: PropTypes.object,
  session: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  let isAdmin = false;
  try {
    const project = await api.projects.getProject(projectId, validatedToken);

    isAdmin =
      session?.user.id != null &&
      project.admins?.some((a) => a.contributorId == session.user.id);
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
        'projects.edit',
        'common.languages',
        'project-presentations.edit',
      ])),
    },
  };
};

export default EditProjectPage;
