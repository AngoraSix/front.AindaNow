import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, {useEffect} from 'react';
import api from '../../../api';
import FormSkeleton from '../../../components/common/Skeletons/FormSkeleton.component';
import ManageProject from '../../../components/Project/ManageProject';
import { resolveRoute, ROUTES, HEADERS } from '../../../constants';
import { useActiveSession } from '../../../hooks/oauth';
import DefaultLayout from '../../../layouts/DefaultLayout';
import logger from '../../../utils/logger';
import { useNotifications } from '../../../hooks/app';

const NOT_ADMIN_ERROR_MESSAGE = 'You need admin privileges to edit the Project';

const EditProjectPage = ({ session, project, isAdmin }) => {
  const { onError } = useNotifications();
  useActiveSession();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      onError(NOT_ADMIN_ERROR_MESSAGE);
      // const viewURL = resolveRoute(ROUTES.projects.view, project.id);
      const viewURL = resolveRoute(ROUTES.projects.presentations.view, "623fd4ed584d6f113deb622a");
      router.push(viewURL);
    }
    return () => {};
  }, []);

  if (!session || session.error || !isAdmin) {
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
    console.log('GERRRRRRRRRRRRRARRRDOO');
    console.log(project);
    isAdmin = session?.user.id === project.adminId;
    props = {
      ...props,
      project,
      isAdmin,
    };
  } catch (err) {
    console.log('NONONONO');
    console.log(err);
    logger.error('err', err);
  }

  if (session && !session.error && !isAdmin) {
    ctx.res.setHeader(HEADERS.messages.error, NOT_ADMIN_ERROR_MESSAGE);
    const viewURL = resolveRoute(ROUTES.projects.view, projectId);
    // return {
    //   redirect: {
    //     destination: viewURL,
    //     permanent: false,
    //   },
    // };
  }

  return {
    props: {
      ...props,
      session,
    },
  };
};

export default EditProjectPage;
