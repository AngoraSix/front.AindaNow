import React from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import ProfileLayout from '../../layouts/ProfileLayout';
import Profile from '../../components/Profile';
import { getToken } from 'next-auth/jwt';
import { oauthFrameworkConfig } from '../../config/oauth';
import { getSession } from 'next-auth/react';

const ContributorProfile = ({ profile, isCurrentContributor }) => {
  console.log("TTTTT");
  console.log(isCurrentContributor);
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
    console.log("EEEEE");
    console.log(token?.user.id === profileId);
  try {
    const profile = await api.contributors.getContributor(profileId, token);
    props = {
      ...props,
      profile,
      isCurrentContributor: token?.user.id === profileId,
    };
  } catch (err) {
    console.log('err', err);
  }

  return {
    props,
  };
};

export default ContributorProfile;