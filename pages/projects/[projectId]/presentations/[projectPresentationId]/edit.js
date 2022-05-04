import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import api from '../../../../../api';
import FormSkeleton from '../../../../../components/common/Skeletons/FormSkeleton.component';
import ProjectPresentationForm from '../../../../../components/Project/ProjectPresentation/Form';
import { resolveRoute, ROUTES } from '../../../../../constants';
import { useNotifications } from '../../../../../hooks/app';
import { useActiveSession } from '../../../../../hooks/oauth';
import DefaultLayout from '../../../../../layouts/DefaultLayout';
import logger from '../../../../../utils/logger';

const NOT_ADMIN_ERROR_MESSAGE =
  'You need admin privileges to edit this Project Presentation';

const EditProjectPresentationPage = ({
  session,
  projectPresentation,
  isAdmin,
}) => {
  useActiveSession();
  const { onError } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.error && !isAdmin) {
      onError(NOT_ADMIN_ERROR_MESSAGE);
      const viewURL = resolveRoute(
        ROUTES.projects.presentations.view,
        projectPresentation.projectId,
        projectPresentation.id
      );
      router.push(viewURL);
    }
    return () => {};
  }, []);

  if (!session || session.error || !projectPresentation || !isAdmin) {
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
      <ProjectPresentationForm projectPresentation={projectPresentation} />
    </DefaultLayout>
  );
};

EditProjectPresentationPage.defaultProps = {
  isAdmin: false,
};

EditProjectPresentationPage.propTypes = {
  projectPresentation: PropTypes.object,
  session: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectPresentationId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  let isAdmin = false;
  try {
    const projectPresentation = await api.projects.getProjectPresentation(
      projectPresentationId,
      validatedToken
    );
    isAdmin =
      session?.user.id != null &&
      session?.user.id === projectPresentation.project.adminId;
    props = {
      ...props,
      projectPresentation,
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

export default EditProjectPresentationPage;