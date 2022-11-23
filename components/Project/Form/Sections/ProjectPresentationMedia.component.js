import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import PresentationSectionMediaData from '../../ProjectPresentation/Form/Sections/PresentationSectionMediaData.component';

const MOBILE_DESCRIPTION =
  'projects.edit.form.steps.step.media.description.mobile';

const FULL_DESCRIPTION = 'projects.edit.form.steps.step.media.description.full';

const ProjectPresentationMedia = ({
  formData,
  onFormChange,
  withDescription,
  isMobile,
  setIsCompleted,
  wasSubmitted,
}) => {
  const { t } = useTranslation('projects.edit');
  const onNestedFormChange = (parentField) => (nestedField, value) => {
    onFormChange(`${parentField}.${nestedField}`)(value);
  };

  const filterParentFormDataPath = (formDataObj, parentFormDataPath) => {
    parentFormDataPath = `${parentFormDataPath}.`;
    return Object.entries(formDataObj).reduce(
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
  };

  return (
    <Box className="ProjectPresentationMedia ProjectPresentationMedia__Container ProjectForm__Section__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectPresentationMedia__Description">
          <Typography>
            {t(isMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION)}
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
