import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import api from '../../../api';
import FormSkeleton from '../../../components/common/Skeletons/FormSkeleton.component';
import ManageProject from '../../../components/Project/ManageProject';
import { resolveRoute, ROUTES } from '../../../constants';
import { useNotifications } from '../../../hooks/app';
import { useActiveSession } from '../../../hooks/oauth';
import DefaultLayout from '../../../layouts/DefaultLayout';
import logger from '../../../utils/logger';

const NOT_ADMIN_ERROR_MESSAGE =
  'You need admin privileges to edit this Project';

const EditProjectPage = ({ session, project, isAdmin }) => {
  useActiveSession();
  const { onError } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.error && !isAdmin) {
      onError(NOT_ADMIN_ERROR_MESSAGE);
      // const viewURL = resolveRoute(ROUTES.projects.view, project.id);
      const viewURL = resolveRoute(
        ROUTES.projects.presentations.view,
        '6248ba9bda2c4941bf9df036'
      );
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
    <DefaultLayout>
      <ManageProject />
    </DefaultLayout>
  );
};

EditProjectPage.defaultProps = {};

EditProjectPage.propTypes = {};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  let isAdmin = false;
  try {
    const project = await api.projects.getProject(projectId, validatedToken);
    isAdmin = session?.user.id === project.adminId;
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
    },
  };
};

export default EditProjectPage;
