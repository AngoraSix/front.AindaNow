import { getSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../../api';
import Profile from '../../components/Profile';
import { useActiveSession } from '../../hooks/oauth';
import ProfileLayout from '../../layouts/ProfileLayout';
import logger from '../../utils/logger';

const ContributorProfile = ({
  profile,
  isCurrentContributor,
  administeredProjects,
}) => {
  isCurrentContributor && useActiveSession();

  return (
    <ProfileLayout>
      <Profile
        profile={profile}
        isCurrentContributor={isCurrentContributor}
        administeredProjects={administeredProjects}
      />
    </ProfileLayout>
  );
};

ContributorProfile.defaultProps = {
  isCurrentContributor: false,
  administeredProjects: [],
};

ContributorProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool,
  administeredProjects: PropTypes.array,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { profileId } = ctx.params;
  const session = await getSession(ctx);
  const userId = session?.user.id;
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  try {
    const profile = await api.contributors.getContributor(
      profileId,
      validatedToken
    );
    const administeredProjects = await api.projects.fetchProjects({
      adminId: userId,
    });
    props = {
      ...props,
      profile,
      isCurrentContributor: userId === profileId,
      administeredProjects,
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

export default ContributorProfile;
