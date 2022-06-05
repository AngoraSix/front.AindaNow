import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import React from 'react';
import api from '../../../api';
import FormSkeleton from '../../../components/common/Skeletons/FormSkeleton.component';
import { resolveRoute, ROUTES } from '../../../constants';
import DefaultLayout from '../../../layouts/DefaultLayout';
import logger from '../../../utils/logger';

const ProjectViewPage = ({}) => {
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

    return {
      redirect: {
        permanent: false,
        destination: resolveRoute(
          ROUTES.projects.presentations.view,
          project.id,
          project.presentations?.[0]?.id
        ),
      },
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

export default ProjectViewPage;
