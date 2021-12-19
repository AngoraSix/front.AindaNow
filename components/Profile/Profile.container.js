import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';
import Profile from './Profile.component';
import api from '../../api';
import { useLoading, useNotifications } from '../../hooks/app';
import ProfileReducer, {
  INITIAL_STATE,
  updateAttributesAction,
} from './Profile.reducer';
import { PROFILE_ATTRIBUTES } from '../../constants';

const ProfileContainer = ({ profile, isCurrentContributor }) => {
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();
  const [profileFields, dispatch] = useReducer(ProfileReducer, {
    ...INITIAL_STATE,
    attributes: profile.attributes,
  });
  const profileAttributes = profileFields.attributes;

  const onEditAttributeField = async (fieldName, fieldValue) => {
    doLoad(true);
    try {
      const updatedAttributes = {
        ...profileAttributes,
        [fieldName]: fieldValue,
      };
      const setResponse = await api.front.setProfileAttributes(
        updatedAttributes
      );
      onSuccess('Profile field updated successfully!');
      dispatch(updateAttributesAction(updatedAttributes));
      if (fieldName === PROFILE_ATTRIBUTES.profilePicture.key) {
        signIn('angorasixkeycloak');
      }
    } catch (err) {
      onError('There was an error updating the Profile field');
    }
    doLoad(false);
    return;
  };

  return (
    <Profile
      profile={profile}
      profileAttributes={profileAttributes}
      isCurrentContributor={isCurrentContributor}
      onEditField={onEditAttributeField}
    />
  );
};

ProfileContainer.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool.isRequired,
};

export default ProfileContainer;
