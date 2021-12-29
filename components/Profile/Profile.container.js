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
import logger from '../../utils/logger';

const ProfileContainer = ({ profile, isCurrentContributor }) => {
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();
  const [profileFields, dispatch] = useReducer(ProfileReducer, {
    ...INITIAL_STATE,
    attributes: profile.attributes,
  });
  const profileAttributes = profileFields.attributes;

  const onEditAttributeField = async (
    fieldName,
    fieldValue,
    isMedia = false
  ) => {
    doLoad(true);
    let updatedAttributes = { ...profileAttributes };
    try {
      if (isMedia) {
        let imageURL = fieldValue,
          thumbnailURL = null;
        if (imageURL instanceof File || typeof imageURL === 'object') {
          [imageURL, thumbnailURL] = await api.front.uploadFile(imageURL);
          updatedAttributes[`${fieldName}.thumbnail`] = thumbnailURL;
          fieldValue = imageURL;
        }
      }
      updatedAttributes[fieldName] = fieldValue;
      const setResponse = await api.front.setProfileAttributes(
        updatedAttributes
      );
      onSuccess('Profile field updated successfully!');
      dispatch(updateAttributesAction(updatedAttributes));
      if (fieldName === PROFILE_ATTRIBUTES.profilePicture.key) {
        signIn('angorasixkeycloak');
      }
    } catch (err) {
      const errorMessage = 'There was an error updating the Profile field';
      logger.error(`${errorMessage} - ${err}`);
      onError(errorMessage);
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
