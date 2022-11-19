import { getSession } from 'next-auth/react';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../../api';
import Profile from '../../components/Profile';
import { useActiveSession } from '../../hooks/oauth';
import ProfileLayout from '../../layouts/ProfileLayout';
import logger from '../../utils/logger';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ContributorProfile = ({ profile, isCurrentContributor }) => {
  isCurrentContributor && useActiveSession(true);

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

    console.log(ctx.locale);

    return {
      props: {
        ...props,
        ...(await serverSideTranslations(ctx.locale, ['common'])),
        profile,
        isCurrentContributor: userId === profileId,
      },
    };
  } catch (err) {
    logger.error('err', err);
  }

  return {
    props: {
      ...props,
      ...(await serverSideTranslations(ctx.locale, ['common'])),
      session,
    },
  };
};

export default ContributorProfile;
