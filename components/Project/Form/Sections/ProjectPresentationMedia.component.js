import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import PresentationSectionMediaData from '../../ProjectPresentation/Form/Sections/PresentationSectionMediaData.component';

const MOBILE_DESCRIPTION = 'Time to add some visual aids...';

const FULL_DESCRIPTION =
  'Media will help explain the purpose of the project in an appealing manner...';

const ProjectPresentationMedia = ({
  formData,
  onFormChange,
  withDescription,
  isNotMobile,
  setIsCompleted,
  wasSubmitted,
}) => {
  const onNestedFormChange = (parentField) => (nestedField, value) => {
    onFormChange(`${parentField}.${nestedField}`)(value);
  };

  const filterParentFormDataPath = (formDataObj, parentFormDataPath) => {
    parentFormDataPath = `${parentFormDataPath}.`;
    let asd = Object.entries(formDataObj).reduce(
      (filteredFormData, [formDataField, formDataValue]) => {
        if (formDataField.startsWith(parentFormDataPath)) {
          return Object.assign(filteredFormData, {
            [formDataField.replace(parentFormDataPath, '')]: formDataValue,
          });
        }
        return filteredFormData;
      },
      {}
    );
    return asd;
  };

  return (
    <Box className="ProjectPresentationMedia ProjectPresentationMedia__Container ProjectForm__Section__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectPresentationMedia__Description">
          <Typography>
            {isNotMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION}
          </Typography>
        </Box>
      )}
      <PresentationSectionMediaData
        formData={filterParentFormDataPath(
          formData,
          'presentations[0].sections[0]'
        )}
        onFormChange={onNestedFormChange('presentations[0].sections[0]')}
        setIsCompleted={setIsCompleted}
        wasSubmitted={wasSubmitted}
      />
    </Box>
  );
};

ProjectPresentationMedia.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
  setIsCompleted: () => {},
  wasSubmitted: false,
};

ProjectPresentationMedia.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
  setIsCompleted: PropTypes.func,
  wasSubmitted: PropTypes.bool,
};

export default ProjectPresentationMedia;
