import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import api from '../../api';
import { PROFILE_ATTRIBUTES } from '../../constants';
import { useLoading, useNotifications } from '../../hooks/app';
import logger from '../../utils/logger';
import Profile from './Profile.component';
import ProfileReducer, {
  INITIAL_STATE,
  updateAttributesAction
} from './Profile.reducer';

const ProfileContainer = ({ profile, isCurrentContributor }) => {
  const {t} = useTranslation('profile');
  const router = useRouter();
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();
  const [profileFields, dispatch] = useReducer(ProfileReducer, {
    ...INITIAL_STATE,
    attributes: profile.attributes || {},
  });

  useEffect(() => {
    dispatch(updateAttributesAction(profile.attributes || {}));
  }, [profile]);

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
      onSuccess(t('profile.edit.form.notifications.success.updated'));
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
      key={router.asPath} // Since this page can direct to to same page (to different user), we want to re-render if URL changes
      profile={profile}
      profileAttributes={profileAttributes}
      isCurrentContributor={isCurrentContributor}
      onEditField={onEditAttributeField}
    />
  );
};

ProfileContainer.defaultProps = {};

ProfileContainer.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentContributor: PropTypes.bool.isRequired,
};

export default ProfileContainer;
