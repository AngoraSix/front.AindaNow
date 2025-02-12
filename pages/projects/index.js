import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../../api';
import ProjectPresentationsList from '../../components/ProjectPresentationsList';
import ProjectsLayout from '../../layouts/ProjectsLayout/ProjectsLayout';
import logger from '../../utils/logger';
import { useActiveSession } from '../../hooks/oauth';

const ProjectPresentationsListingPage = ({ projectPresentationsList }) => {
  const { t } = useTranslation('project-presentations.list');
  useActiveSession(true);

  return (
    <ProjectsLayout
      headData={{
        title: t('project-presentations.list.page.title'),
        description: t('project-presentations.list.page.description'),
      }}
    >
      <ProjectPresentationsList
        projectPresentationsList={projectPresentationsList}
      />
    </ProjectsLayout>
  );
};

ProjectPresentationsListingPage.defaultProps = {
  projectPresentationsList: [],
};

ProjectPresentationsListingPage.propTypes = {
  projectPresentationsList: PropTypes.array,
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  let props = {
    ...(await serverSideTranslations(ctx.locale, [
      'common',
      'project-presentations.list',
    ])),
  };

  try {
    const validatedToken =
      session?.error !== 'RefreshAccessTokenError' ? session : null;
    const projectPresentationsList =
      await api.projects.fetchProjectPresentations(
        session?.user?.attributes,
        validatedToken
      );
    props = {
      ...props,
      projectPresentationsList,
    };
  } catch (err) {
    logger.error('err', err);
  }
  return {
    props,
  };
};

export default ProjectPresentationsListingPage;
