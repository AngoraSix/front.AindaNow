import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useReducer } from 'react';
import api from '../../api';
import {
  PROFILE_ATTRIBUTES,
  PROFILE_ATTRIBUTE_THUMBNAIL_MAP,
} from '../../constants';
import { useLoading, useNotifications } from '../../hooks/app';
import logger from '../../utils/logger';
import Profile from './Profile.component';
import Contributor from '../../models/Contributor';
import Media from '../../models/Media';
import ProfileReducer, {
  INITIAL_STATE,
  updateProfileField,
} from './Profile.reducer';
import { INPUT_FIELD_TYPES } from '../../constants';

const ProfileContainer = ({ profile, isCurrentContributor }) => {
  const { t } = useTranslation('profile');
  const router = useRouter();
  const { doLoad } = useLoading();
  const { onSuccess, onError } = useNotifications();
  const [contributorData, dispatch] = useReducer(ProfileReducer, {
    ...INITIAL_STATE,
    contributorProfile: new Contributor(profile),
  });

  useEffect(() => {
    // dispatch(updateAttributesAction(profile || {}));
  }, [contributorData.contributorProfile]);

  const onEditAttributeField = async (
    fieldName,
    fieldValue,
    isMedia = false
  ) => {
    doLoad(true);
    try {
      const updatedField = isMedia ? await uploadMedia(fieldValue) : fieldValue;

      contributorData.contributorProfile[fieldName] = fieldValue;
      await api.front.updateProfileField(contributorData.contributorProfile.id, fieldName, updatedField);
      // await api.front.setProfileAttributes({...contributorData.profile, ...updatedProfileField});
      onSuccess(t('profile.edit.form.notifications.success.updated'));
      dispatch(updateProfileField({ [fieldValue]: updatedField }));
      if (fieldName === PROFILE_ATTRIBUTES.profilePicture.key) {
        signIn('angorasixspring');
      }
    } catch (err) {
      const errorMessage = 'There was an error updating the Profile field';
      logger.error(`${errorMessage} - ${err}`);
      onError(errorMessage);
    }
    doLoad(false);
    return;
  };

  const uploadMedia = async (fieldValue) => {
    const imageFile = fieldValue[0]?.file;
    // fieldValue = fieldValue[0]?.thumbnailURL;
    if (imageFile instanceof File || typeof imageFile === 'object') {
      let [imageURL, thumbnailURL] = await api.front.uploadFile(imageFile);
      return new Media({
        mediaType: INPUT_FIELD_TYPES.IMAGE,
        url: imageURL,
        thumbnailUrl: thumbnailURL,
        resourceId: fieldValue[0]?.key,
      });
    }
    throw new Error(`Cannot upload media. File: ${fieldValue}`);
  };

  return (
    <Profile
      key={router.asPath} // Since this page can direct to to same page (to different user), we want to re-render if URL changes
      profile={contributorData.contributorProfile}
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
