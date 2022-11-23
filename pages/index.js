import { getSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../api';
import ProjectPresentationsList from '../components/ProjectPresentationsList';
import config from '../config';
import ProjectsLayout from '../layouts/ProjectsLayout/ProjectsLayout';
import logger from '../utils/logger';

const HomePage = ({ projectPresentationsList }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{config.site.head.title}</title>
      </Head>

      <ProjectsLayout>
        <ProjectPresentationsList
          projectPresentationsList={projectPresentationsList}
        />
      </ProjectsLayout>
    </React.Fragment>
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
