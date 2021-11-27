import React from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import ProfileLayout from '../../layouts/ProfileLayout';
import Profile from '../../components/Profile';
import { getToken } from 'next-auth/jwt';
import oauthConfig, { oauthFrameworkConfig } from '../../config/oauth';

const ContributorProfile = ({ profile }) => {
  return (
    <ProfileLayout>
      <Profile profile={profile} />
    </ProfileLayout>
  );
};

ContributorProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export const getServerSideProps = async (ctx) => {
  let props = {};
  const { profileId } = ctx.params,
    token = await getToken({ ...ctx, secret: oauthFrameworkConfig.jwt.secret });
  try {
    const profile = await api.contributors.getContributor(profileId, token);

    props = {
      ...props,
      profile,
    };
  } catch (err) {
    console.log('err', err);
  }

  return {
    props,
  };
};

export default ContributorProfile;
