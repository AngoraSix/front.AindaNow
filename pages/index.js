import { getSession, signIn, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import Head from 'next/head';
import React from 'react';
import PropTypes from 'prop-types';
import api from '../api';
import ProjectsList from '../components/ProjectsList';
import config from '../config';
import ProjectsLayout from '../layouts/ProjectsLayout/ProjectsLayout';
import { useEffect } from 'react';
import oauthConfig from '../config/oauth'; //../config/oauth';

const HomePage = ({ projectsList }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

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
    console.log('err', err);
  }

  return {
    props,
  };
};

export default HomePage;
