import { getSession } from 'next-auth/client';
import Head from 'next/head';
import PropTypes from 'prop-types';
import api from '../api';
import ProjectsList from '../components/ProjectsList';
import config from '../config';
import ProjectsLayout from '../layouts/ProjectsLayout/ProjectsLayout';

const HomePage = ({ projectsList }) => (
  <React.Fragment>
    <Head>
      <title>{config.site.head.title}</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/fonts/Ruluko.css" />
      <link rel="stylesheet" href="/fonts/ZCool.css" />
    </Head>

    <ProjectsLayout>
      <ProjectsList data={{ projectsList }} />
    </ProjectsLayout>
  </React.Fragment>
);

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
    const projectPresentationsList = await api.projects.fetchProjectPresentations(
      session && session.user ? session.user.attributes : undefined
    );

    props = {
      ...props,
      projectsList: projectPresentationsList,
    };
  } catch (err) {
    console.log('err', err);
  }

  return {
    props,
  };
};

export default HomePage;
