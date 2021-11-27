import PropTypes from 'prop-types';
import React from 'react';
import Profile from './Profile.component';

const ProfileContainer = ({ profile }) => {
  return <Profile profile={profile} />;
};

ProfileContainer.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileContainer;
