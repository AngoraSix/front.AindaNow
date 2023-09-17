import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PropTypes from 'prop-types';
import React from 'react';
import api from '../../api';
import Profile from '../../components/Profile';
import { useActiveSession } from '../../hooks/oauth';
import ProfileLayout from '../../layouts/ProfileLayout';
import logger from '../../utils/logger';

const ContributorProfile = ({ profile, isCurrentContributor }) => {
  const { t } = useTranslation('profile');
  useActiveSession(true, isCurrentContributor);

  return (
    <ProfileLayout
      key={profile.id}
      headData={{
        title: t('profile.page.title.template').replace(
          ':profile',
          `${profile.firstName} ${profile.lastName}`
        ),
        description: t('profile.page.description.template').replace(
          ':profile',
          `${profile.firstName} ${profile.lastName}`
        ),
      }}
    >
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

    return {
      props: {
        ...props,
        ...(await serverSideTranslations(ctx.locale, ['common', 'profile'])),
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
      ...(await serverSideTranslations(ctx.locale, ['common', 'profile'])),
      session,
    },
  };
};

export default ContributorProfile;
