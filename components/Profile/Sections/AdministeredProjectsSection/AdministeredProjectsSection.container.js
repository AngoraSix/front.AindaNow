import PropTypes from 'prop-types';
import React from 'react';
import AdministeredProjectsSection from './AdministeredProjectsSection.component';

const AdministeredProjectsSectionContainer = ({
  isCurrentContributor,
  administeredProjects,
}) => {
  return (
    <AdministeredProjectsSection
      administeredProjects={administeredProjects}
      isCurrentContributor={isCurrentContributor}
    />
  );
};

AdministeredProjectsSectionContainer.defaultProps = {
  administeredProjects: [],
};

AdministeredProjectsSectionContainer.propTypes = {
  administeredProjects: PropTypes.array,
  isCurrentContributor: PropTypes.bool.isRequired,
};

export default AdministeredProjectsSectionContainer;
