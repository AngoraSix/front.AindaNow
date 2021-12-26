import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Avatar } from '@mui/material';
import Editable from '../../common/Editable';
import { PROFILE_ATTRIBUTES } from '../../../constants';
import { EDITABLE_FIELD_TYPES } from '../../../constants';
import { useTheme } from '@mui/styles';

const ContributorPresentationSection = ({
  profile,
  profileAttributes,
  isCurrentContributor,
  onEditField,
}) => {
  const onEdit = (fieldName, isMedia = false) => {
    return (fieldValue) => {
      return onEditField(fieldName, fieldValue, isMedia);
    };
  };

  const getAttributeValue = (fieldName) => {
    const attributeValue = profileAttributes[fieldName];
    return Array.isArray(attributeValue) ? attributeValue[0] : attributeValue;
  };

  const theme = useTheme();

  return (
    <Paper className="Presentation">
      <div className="Profile__Editable__Container Presentation__HeadImageContainer">
        <Editable
          type={EDITABLE_FIELD_TYPES.IMAGE}
          isEditable={isCurrentContributor}
          fieldName={PROFILE_ATTRIBUTES.headImage.label}
          fieldValue={getAttributeValue(PROFILE_ATTRIBUTES.headImage.key)}
          onEdit={onEdit(PROFILE_ATTRIBUTES.headImage.key, true)}
        >
          <div
            className="Presentation__HeadImage"
            style={{
              backgroundImage: `url(${getAttributeValue(
                PROFILE_ATTRIBUTES.headImage.key
              )}), url(${getAttributeValue(
                PROFILE_ATTRIBUTES.headImageThumbnail.key
              )}) `,
              backgroundColor: theme.palette.primary.main,
            }}
          ></div>
        </Editable>
      </div>
      <div className="Profile__Editable__Container Presentation__ProfileImageContainer">
        <Editable
          type={EDITABLE_FIELD_TYPES.IMAGE}
          isEditable={isCurrentContributor}
          fieldName={PROFILE_ATTRIBUTES.profilePicture.label}
          fieldValue={getAttributeValue(PROFILE_ATTRIBUTES.profilePicture.key)}
          onEdit={onEdit(PROFILE_ATTRIBUTES.profilePicture.key, true)}
        >
          <div className={'Presentation__ProfileImage'}>
            <Avatar
              src={
                getAttributeValue(
                  PROFILE_ATTRIBUTES.profilePictureThumbnail.key
                ) || getAttributeValue(PROFILE_ATTRIBUTES.profilePicture.key)
              }
              sx={{ width: '100%', height: '100%' }}
            ></Avatar>
          </div>
        </Editable>
      </div>

      <div className="Presentation__ContributorData">
        <Typography
          className="ContributorData__Name"
          variant="h5"
        >{`${profile.firstName} ${profile.lastName}`}</Typography>
      </div>
    </Paper>
  );
};

ContributorPresentationSection.defaultProps = {
  profileAttributes: {},
};

ContributorPresentationSection.propTypes = {
  profile: PropTypes.object.isRequired,
  profileAttributes: PropTypes.object,
  onEditField: PropTypes.func.isRequired,
};

export default ContributorPresentationSection;
