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
import { createObjectFromFlatParams } from '../../../../../utils/helpers';
import { PROJECT_PRESENTATION_SECTION_FORM_FIELDS as PRESENTATION_SECTION_FIELDS } from '../ProjectPresentationForm.properties';
import PresentationSectionMediaData from './PresentationSectionMediaData.component';

const SECTIONS_PARENT_FORM_DATA_PATH = 'sections';

const ProjectPresentationsSectionsData = ({
  formData,
  projectPresentation,
  onFormChange,
  wasSubmitted,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleFocusChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onNestedFormChange = (index) => (nestedField, value) => {
    onFormChange(`${SECTIONS_PARENT_FORM_DATA_PATH}[${index}].${nestedField}`)(
      value
    );
  };

  const filterParentFormDataPath = (formDataObj, index) => {
    const parentFormDataPath = `${SECTIONS_PARENT_FORM_DATA_PATH}[${index}].`;
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
  const sectionsObj = Object.assign(
    {},
    ...Object.entries(formData)
      .filter(([formKey]) => formKey.startsWith(SECTIONS_PARENT_FORM_DATA_PATH))
      .map(([formKey, formValue]) => ({
        [formKey.replace(SECTIONS_PARENT_FORM_DATA_PATH, 'sections')]:
          formValue,
      }))
  );

  const sections = createObjectFromFlatParams(sectionsObj).sections || [];

  return (
    <Box className="ProjectPresentationsSectionsData ProjectPresentationsSectionsData__Container ProjectForm__Section__Container">
      {sections.map((s, i) => (
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
                  formData[
                    `sections[${i}].${PRESENTATION_SECTION_FIELDS.title.key}`
                  ]
                }
                onChange={onFormChange(
                  `sections[${i}].${PRESENTATION_SECTION_FIELDS.title.key}`
                )}
                error={
                  wasSubmitted &&
                  PRESENTATION_SECTION_FIELDS.title.required &&
                  !formData[
                    `sections[${i}].${PRESENTATION_SECTION_FIELDS.title.key}`
                  ]
                }
                fullWidth
              />
            </Box>
            <Box className="ProjectPresentationsSectionsData__Field">
              <TextField
                {...PRESENTATION_SECTION_FIELDS.description}
                value={
                  formData[
                    `sections[${i}].${PRESENTATION_SECTION_FIELDS.description.key}`
                  ] || ''
                }
                onChange={onFormChange(
                  `sections[${i}].${PRESENTATION_SECTION_FIELDS.description.key}`
                )}
                error={
                  wasSubmitted &&
                  PRESENTATION_SECTION_FIELDS.description.required &&
                  !formData[
                    `sections[${i}].${PRESENTATION_SECTION_FIELDS.description.key}`
                  ]
                }
                fullWidth
              />
            </Box>
            <Box className="ProjectPresentationsSectionsData__Field">
              <PresentationSectionMediaData
                formData={filterParentFormDataPath(formData, i)}
                onFormChange={onNestedFormChange(i)}
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
  projectPresentation: {},
  isMobile: false,
};

ProjectPresentationsSectionsData.propTypes = {
  formData: PropTypes.object,
  projectPresentation: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default ProjectPresentationsSectionsData;
