import { signIn } from 'next-auth/react';
import PropTypes from 'prop-types';
import React, { useReducer } from 'react';
import api from '../../api';
import { PROFILE_ATTRIBUTES } from '../../constants';
import { useLoading, useNotifications } from '../../hooks/app';
import logger from '../../utils/logger';
import Profile from './Profile.component';
import ProfileReducer, {
  INITIAL_STATE,
  updateAttributesAction,
} from './Profile.reducer';

const ProfileContainer = ({
  profile,
  isCurrentContributor,
  administeredProjects,
}) => {
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
        let imageFile = fieldValue[0]?.file;
        fieldValue = fieldValue[0]?.thumbnailURL;
        if (imageFile instanceof File || typeof imageFile === 'object') {
          let [imageURL, thumbnailURL] = await api.front.uploadFile(imageFile);
          updatedAttributes[`${fieldName}.thumbnail`] = thumbnailURL;
          fieldValue = imageURL;
        }
      }
      updatedAttributes[fieldName] = fieldValue;
      await api.front.setProfileAttributes(updatedAttributes);
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
      administeredProjects={administeredProjects}
    />
  );
};

ProfileContainer.defaultProps = {
  administeredProjects: [],
};

ProfileContainer.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool.isRequired,
  administeredProjects: PropTypes.array,
};

export default ProfileContainer;
