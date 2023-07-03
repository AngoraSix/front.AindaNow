import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import AdministeredProjectsSection from './Sections/AdministeredProjectsSection';
import ContributorPresentationSection from './Sections/ContributorPresentationSection';

const Profile = ({ profile, isCurrentContributor, onEditField }) => {
  return (
    <Box className="Profile Profile__Container">
      <ContributorPresentationSection
        profile={profile}
        isCurrentContributor={isCurrentContributor}
        onEditField={onEditField}
      />
      <AdministeredProjectsSection
        contributorId={profile.id}
        isCurrentContributor={isCurrentContributor}
      />
    </Box>
  );
};

Profile.defaultProps = {};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool.isRequired,
  onEditField: PropTypes.func.isRequired,
};

export default Profile;
