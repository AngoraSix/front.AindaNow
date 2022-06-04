import { Avatar, Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { INPUT_FIELD_TYPES, PROFILE_ATTRIBUTES } from '../../../../constants';
import Editable from '../../../common/Editable';

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
    <Paper className="Presentation Profile__Section">
      <Box className="Profile__Editable__Container Presentation__HeadImageContainer">
        <Editable
          type={INPUT_FIELD_TYPES.IMAGE}
          isEditable={isCurrentContributor}
          fieldName={PROFILE_ATTRIBUTES.headImage.label}
          onEdit={onEdit(PROFILE_ATTRIBUTES.headImage.key, true)}
        >
          <Box
            className="Presentation__HeadImage"
            style={{
              backgroundImage: `url(${getAttributeValue(
                PROFILE_ATTRIBUTES.headImage.key
              )}), url(${getAttributeValue(
                PROFILE_ATTRIBUTES.headImageThumbnail.key
              )}) `,
              backgroundColor: theme.palette.primary.main,
            }}
          ></Box>
        </Editable>
      </Box>
      <Box className="Profile__Editable__Container Presentation__ProfileImageContainer">
        <Editable
          type={INPUT_FIELD_TYPES.IMAGE}
          isEditable={isCurrentContributor}
          fieldName={PROFILE_ATTRIBUTES.profilePicture.label}
          onEdit={onEdit(PROFILE_ATTRIBUTES.profilePicture.key, true)}
        >
          <Box className={'Presentation__ProfileImage'}>
            <Avatar
              src={
                getAttributeValue(
                  PROFILE_ATTRIBUTES.profilePictureThumbnail.key
                ) || getAttributeValue(PROFILE_ATTRIBUTES.profilePicture.key)
              }
              sx={{ width: '100%', height: '100%' }}
            ></Avatar>
          </Box>
        </Editable>
      </Box>

      <Box className="Presentation__ContributorData">
        <Typography
          className="ContributorData__Name"
          variant="h5"
        >{`${profile.firstName} ${profile.lastName}`}</Typography>
      </Box>
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
