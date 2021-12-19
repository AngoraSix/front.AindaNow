import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Avatar } from '@mui/material';
import Editable from '../../common/Editable';
import { PROFILE_ATTRIBUTES } from '../../../constants';
import { EDITABLE_FIELD_TYPES } from '../../../constants';
import EditIcon from '@mui/icons-material/Edit';

const ContributorPresentationSection = ({
  profile,
  isCurrentContributor,
  onEditField,
}) => {
  const onEdit = (fieldName) => {
    return (fieldValue) => {
      return onEditField(fieldName, fieldValue);
    };
  };

  const getAttributeValue = (fieldName, extractFromArray = false) => {
    return extractFromArray
      ? profile.attributes?.[fieldName][0]
      : profile.attributes?.[fieldName];
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
                'url(https://naldzgraphics.net/wp-content/uploads/2012/06/road-wallpaper.jpg)',
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
            <img
              src={getAttributeValue(PROFILE_ATTRIBUTES.profilePicture.key)}
            ></img>
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

ContributorPresentationSection.defaultProps = {};

ContributorPresentationSection.propTypes = {
  profile: PropTypes.object.isRequired,
  onEditField: PropTypes.func.isRequired,
};

export default ContributorPresentationSection;
