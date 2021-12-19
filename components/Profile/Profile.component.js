import ContributorPresentationSection from './Sections/ContributorPresentationSection.component';
import PropTypes from 'prop-types';
import React from 'react';

const Profile = ({ profile, isCurrentContributor, onEditField }) => {
  return (
    <div className="Profile Profile__Container">
      <ContributorPresentationSection
        profile={profile}
        isCurrentContributor={isCurrentContributor}
        onEditField={onEditField}
      />
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool.isRequired,
  onEditField: PropTypes.func.isRequired,
};

export default Profile;
