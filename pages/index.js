import { getSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import ProjectsList from '../components/ProjectsList';
import config from '../config';
import ProjectsLayout from '../layouts/ProjectsLayout/ProjectsLayout';
import logger from '../utils/logger';

const HomePage = ({ projectsList }) => {
  return (
    <React.Fragment>
      <Head>
        <title>{config.site.head.title}</title>
      </Head>

      <ProjectsLayout>
        <ProjectsList data={{ projectsList }} />
      </ProjectsLayout>
    </React.Fragment>
  );
};

HomePage.defaultProps = {
  projectsList: [],
};

HomePage.propTypes = {
  projectsList: PropTypes.array,
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  let props = {};

  try {
    const projectPresentationsList =
      await api.projects.fetchProjectPresentations(session?.user?.attributes);

    props = {
      ...props,
      projectsList: projectPresentationsList,
    };
  } catch (err) {
    logger.error('err', err);
  }

  return {
    props,
  };
};

export default HomePage;
