import ContributorPresentationSection from './Sections/ContributorPresentationSection.component';
import PropTypes from 'prop-types';
import React from 'react';

const Profile = ({
  profile,
  profileAttributes,
  isCurrentContributor,
  onEditField,
}) => {
  return (
    <div className="Profile Profile__Container">
      <ContributorPresentationSection
        profile={profile}
        profileAttributes={profileAttributes}
        isCurrentContributor={isCurrentContributor}
        onEditField={onEditField}
      />
    </div>
  );
};

Profile.defaultProps = {
  profileAttributes: {},
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  profileAttributes: PropTypes.object,
  isCurrentContributor: PropTypes.bool.isRequired,
  onEditField: PropTypes.func.isRequired,
};

export default Profile;
