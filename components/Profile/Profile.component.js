import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import AdministeredProjectsSection from './Sections/AdministeredProjectsSection';
import ContributorPresentationSection from './Sections/ContributorPresentationSection';

const Profile = ({
  profile,
  profileAttributes,
  isCurrentContributor,
  onEditField,
}) => {
  return (
    <Box className="Profile Profile__Container">
      <ContributorPresentationSection
        profile={profile}
        profileAttributes={profileAttributes}
        isCurrentContributor={isCurrentContributor}
        onEditField={onEditField}
      />
      <AdministeredProjectsSection />
    </Box>
  );
};

Profile.defaultProps = {
  profileAttributes: {},
  administeredProjects: [],
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  profileAttributes: PropTypes.object,
  isCurrentContributor: PropTypes.bool.isRequired,
  onEditField: PropTypes.func.isRequired,
  administeredProjects: PropTypes.array,
};

export default Profile;
