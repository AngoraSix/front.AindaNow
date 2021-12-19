import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Avatar } from '@mui/material';
import Editable from '../../common/Editable';
import { PROFILE_ATTRIBUTES } from '../../../constants';
import { EDITABLE_FIELD_TYPES } from '../../../constants';

const ContributorPresentationSection = ({
  profile,
  profileAttributes,
  isCurrentContributor,
  onEditField,
}) => {
  const onEdit = (fieldName) => {
    return (fieldValue) => {
      return onEditField(fieldName, fieldValue);
    };
  };

  const getAttributeValue = (fieldName) => {
    const attributeValue = profileAttributes[fieldName];
    return Array.isArray(attributeValue) ? attributeValue[0] : attributeValue;
  };

  return (
    <Paper className="Presentation">
      <div className="Profile__Editable__Container Presentation__HeadImageContainer">
        <Editable
          type={EDITABLE_FIELD_TYPES.IMAGE}
          isEditable={isCurrentContributor}
          fieldName={PROFILE_ATTRIBUTES.headImage.label}
          fieldValue={getAttributeValue(PROFILE_ATTRIBUTES.headImage.key)}
          onEdit={onEdit(PROFILE_ATTRIBUTES.headImage.key)}
        >
          <div
            className="Presentation__HeadImage"
            style={{
              backgroundImage:
                `url(${getAttributeValue(
                  PROFILE_ATTRIBUTES.headImage.key
                )}), ` +
                'url(https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg)',
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
          onEdit={onEdit(PROFILE_ATTRIBUTES.profilePicture.key)}
        >
          <div className={'Presentation__ProfileImage'}>
            <Avatar
              src={getAttributeValue(PROFILE_ATTRIBUTES.profilePicture.key)}
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
