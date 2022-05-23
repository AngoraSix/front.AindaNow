import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { PROJECT_PRESENTATION_SECTION_FORM_FIELDS as PRESENTATION_SECTION_FIELDS } from '../ProjectPresentationForm.properties';
import PresentationSectionMediaData from './PresentationSectionMediaData.component';

const ProjectPresentationsSectionsData = ({
  formData,
  onFormChange,
  wasSubmitted,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleFocusChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSectionFieldChange = (property, index) => (eventOrValue) => {
    const updatedSections = [...(formData.sections || [{}])];
    updatedSections[index][property] = eventOrValue.target
      ? eventOrValue.target.value
      : eventOrValue;
    onFormChange('sections')(updatedSections);
  };

  const onNestedFormChange = (parentField, index) => (nestedField, value) => {
    onFormChange(`${parentField}[${index}].${nestedField}`)(value);
  };

  const filterParentFormDataPath = (formDataObj, parentFormDataPath, index) => {
    parentFormDataPath = `${parentFormDataPath}[${index}].`;
    return Object.entries(formDataObj).reduce(
      (filteredFormData, [formDataField, formDataValue]) => {
        if (formDataField.startsWith(parentFormDataPath)) {
          return Object.assign(filterParentFormDataPath, {
            [formDataField.replace(parentFormDataPath, '')]: formDataValue,
          });
        }
        return filteredFormData;
      },
      {}
    );
  };

  return (
    <Box className="ProjectPresentationsSectionsData ProjectPresentationsSectionsData__Container ProjectForm__Section__Container">
      {formData.sections.map((s, i) => (
        <Accordion
          key={i}
          expanded={expanded === i}
          onChange={handleFocusChange(i)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            className="ProjectPresentationsSectionsData__Summary"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${i}-content1`}
            id={`${i}-header`}
          >
            <Typography
              className="ProjectPresentationsSectionsData__Summary__Text Long"
              noWrap={true}
            >
              {s.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box className="ProjectPresentationsSectionsData__Field">
              <TextField
                {...PRESENTATION_SECTION_FIELDS.title}
                value={
                  formData[sections[i].PRESENTATION_SECTION_FIELDS.title.key]
                }
                onChange={onFormChange(
                  `sections[${i}].${PRESENTATION_SECTION_FIELDS.title.key}`
                )}
                error={
                  wasSubmitted &&
                  PRESENTATION_SECTION_FIELDS.referenceName.required &&
                  !formData.referenceName
                }
                fullWidth
              />
            </Box>
            <Box className="ProjectPresentationsSectionsData__Field">
              <PresentationSectionMediaData
                formData={filterParentFormDataPath(
                  formData,
                  'sections',
                  i
                )}
                onFormChange={onNestedFormChange('sections', i)}
                wasSubmitted={wasSubmitted}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

ProjectPresentationsSectionsData.defaultProps = {
  formData: {},
  isMobile: false,
};

ProjectPresentationsSectionsData.propTypes = {
  formData: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default ProjectPresentationsSectionsData;
