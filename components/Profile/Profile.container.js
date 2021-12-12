import PropTypes from 'prop-types';
import React from 'react';
import Profile from './Profile.component';

const ProfileContainer = ({ profile, isCurrentContributor }) => {
  return <Profile profile={profile} isCurrentContributor={isCurrentContributor} />;
};

ProfileContainer.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool.isRequired
};

export default ProfileContainer;
