import React from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import ProfileLayout from '../../layouts/ProfileLayout';
import Profile from '../../components/Profile';
import { getSession } from 'next-auth/react';
import { useActiveSession } from '../../hooks/oauth';
import logger from '../../utils/logger';

const ContributorProfile = ({ profile, isCurrentContributor }) => {
  isCurrentContributor && useActiveSession();

  return (
    <ProfileLayout>
      <Profile profile={profile} isCurrentContributor={isCurrentContributor} />
    </ProfileLayout>
  );
};

ContributorProfile.defaultProps = {
  isCurrentContributor: false,
};

ContributorProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { profileId } = ctx.params,
    session = await getSession(ctx);
  const validatedToken =
    session?.error !== 'RefreshAccessTokenError' ? session : null;
  try {
    const profile = await api.contributors.getContributor(
      profileId,
      validatedToken
    );
    props = {
      ...props,
      profile,
      isCurrentContributor: session?.user.id === profileId,
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
