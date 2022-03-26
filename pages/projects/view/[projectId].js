import React from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import ProfileLayout from '../../layouts/ProfileLayout';
import Profile from '../../components/Profile';
import { getSession } from 'next-auth/react';
import { useActiveSession } from '../../hooks/oauth';
import logger from '../../utils/logger';

const ProjectView = ({ project }) => {
  isCurrentContributor && useActiveSession();

  return (
    <ProfileLayout>
      <Profile profile={profile} isCurrentContributor={isCurrentContributor} />
    </ProfileLayout>
  );
};

ProjectView.defaultProps = {
  isCurrentContributor: false,
};

ProjectView.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { projectId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  try {
    const project = await api.projects.getProject(projectId, validatedToken);
    props = {
      ...props,
      project,
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

export default ProjectView;
