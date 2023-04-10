import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../api';
import ProjectPresentationsList from '../components/ProjectPresentationsList';
import ProjectsLayout from '../layouts/ProjectsLayout/ProjectsLayout';
import logger from '../utils/logger';

const HomePage = ({ projectPresentationsList }) => {
  const { t } = useTranslation('project-presentations.list');

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

HomePage.defaultProps = {
  projectPresentationsList: [],
};

HomePage.propTypes = {
  projectPresentationsList: PropTypes.array,
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  let props = {};

  try {
    const projectPresentationsList =
      await api.projects.fetchProjectPresentations(session?.user?.attributes);
    props = {
      ...props,
      ...(await serverSideTranslations(ctx.locale, [
        'common',
        'project-presentations.list',
      ])),
      projectPresentationsList,
    };
  } catch (err) {
    logger.error('err', err);
  }
  return {
    props,
  };
};

export default HomePage;
