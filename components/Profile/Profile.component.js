import ContributorPresentationSection from './Sections/ContributorPresentationSection';
import PropTypes from 'prop-types';
import React from 'react';

const Profile = ({ profile, isCurrentContributor }) => {
  return (
    <div className="Profile Profile__Container">
      <ContributorPresentationSection profile={profile} isCurrentContributor={isCurrentContributor} />
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool.isRequired,
};

export default Profile;
