import React from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import ProfileLayout from '../../layouts/ProfileLayout';
import Profile from '../../components/Profile';
import { getToken } from 'next-auth/jwt';
import { oauthFrameworkConfig } from '../../config/oauth';
import { signIn, useSession } from 'next-auth/react';
import { useLoading } from '../../hooks/app';
import { useEffect } from 'react';
import logger from '../../utils/logger';

const ContributorProfile = ({ profile, isCurrentContributor }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const { doLoad } = useLoading();

  useEffect(() => {
    const shouldReauth =
      isCurrentContributor && session?.error === 'RefreshAccessTokenError';
    doLoad(loading || shouldReauth);
    if (shouldReauth) {
      signIn('angorasixkeycloak'); // Force sign in to hopefully resolve error and be able to edit
    }
  }, [session, loading]);
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
    token = await getToken({
      ...ctx,
      secret: oauthFrameworkConfig.jwt.secret,
    });
  const validatedToken =
    token?.error !== 'RefreshAccessTokenError' ? token : null;
  try {
    const profile = await api.contributors.getContributor(
      profileId,
      validatedToken
    );
    props = {
      ...props,
      profile,
      isCurrentContributor: token?.user.id === profileId,
    };
  } catch (err) {
    logger.error('err', err);
  }

  return {
    props,
  };
};

export default ContributorProfile;
