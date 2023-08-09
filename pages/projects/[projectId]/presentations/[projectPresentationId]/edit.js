import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
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
  projectId,
  projectPresentationId,
  isAdmin,
}) => {
  const { t } = useTranslation('project-presentations.edit');
  useActiveSession();
  const { onError } = useNotifications();
  const router = useRouter();

  useEffect(() => {
    if (session && !session.error && !isAdmin) {
      onError(NOT_ADMIN_ERROR_MESSAGE);
      const viewURL = resolveRoute(
        ROUTES.projects.presentations.view,
        projectId,
        projectPresentationId
      );
      router.push(viewURL);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, projectId, projectPresentationId, router, session]);

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
    <DefaultLayout
      headData={{
        title: t('project-presentations.edit.page.title.template').replace(
          ':projectPresentation',
          projectPresentation.referenceName
        ),
        description: t(
          'project-presentations.edit.page.description.template'
        ).replace(':projectPresentation', projectPresentation.referenceName),
      }}
    >
      <ProjectPresentationForm
        projectPresentation={projectPresentation}
        project={projectPresentation.project}
      />
    </DefaultLayout>
  );
};

EditProjectPresentationPage.defaultProps = {
  isAdmin: false,
};

EditProjectPresentationPage.propTypes = {
  projectPresentation: PropTypes.object,
  projectId: PropTypes.string.isRequired,
  projectPresentationId: PropTypes.string.isRequired,
  session: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId, projectPresentationId } = ctx.params;
  const session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  let isAdmin = false;
  try {
    const projectPresentation = await api.projects.getProjectPresentation(
      projectPresentationId,
      projectId,
      validatedToken
    );
    isAdmin =
      session?.user.id != null &&
      projectPresentation.project.admins?.some(a => a.contributorId) &&
      projectPresentation?.projectId === projectId;
    props = {
      ...props,
      projectId,
      projectPresentationId,
      projectPresentation,
      isAdmin,
    };
  } catch (err) {
    logger.error('err', err);
  }

  return {
    props: {
      ...props,
      ...(await serverSideTranslations(ctx.locale, [
        'common',
        'project-presentations.edit',
      ])),
      session,
    },
  };
};

export default EditProjectPresentationPage;
