import PropTypes from 'prop-types';
import React from 'react';
import Profile from './Profile.component';
import api from '../../api';
import { useLoading } from '../../hooks/app';

const ProfileContainer = ({ profile, isCurrentContributor }) => {
  const { doLoad } = useLoading();

  const onEditField = async (fieldName, fieldValue) => {
    doLoad(true);
    console.log('EDITGER');
    console.log(fieldName, fieldValue);
    const setResponse = await api.front.setProfileAttribute(
      fieldName,
      fieldValue
    );
    console.log(setResponse);
    doLoad(false);
  };

  return (
    <Profile
      profile={profile}
      isCurrentContributor={isCurrentContributor}
      onEditField={onEditField}
    />
  );
};

ProfileContainer.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool.isRequired,
};

export default ProfileContainer;
