import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { PROJECT_PRESENTATION_SECTION_FORM_FIELDS as PRESENTATION_SECTION_FIELDS } from '../ProjectPresentationForm.properties';

const ProjectPresentationsSectionsData = ({
  formData,
  onFormChange,
  onSaveFormField,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleFocusChange = (panel) => (event, isExpanded) => {
    if (expanded) {
      onSaveFormField('sections');
    }
    setExpanded(isExpanded ? panel : false);
  };

  const onFieldChange = (property, index) => (eventOrValue) => {
    const updatedSections = [...formData.sections];
    updatedSections[index][property] = eventOrValue.target
      ? eventOrValue.target.value
      : eventOrValue;
    onFormChange('sections')(updatedSections);
  };

  return (
    <Box className="ProjectPresentationsData ProjectPresentationsData__Container ProjectForm__Section__Container">
      {formData.sections.map((s, i) => (
        <Accordion
          key={i}
          expanded={expanded === i}
          onChange={handleFocusChange(i)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            className="ProjectPresentationsData__Summary"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${i}-content1`}
            id={`${i}-header`}
          >
            <Typography
              className="ProjectPresentationsData__Summary__Text Long"
              noWrap={true}
            >
              {s.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              className="ProjectPresentationForm__Section__Fields ProjectPresentationSectionsData__Fields"
              container
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={10}>
                <TextField
                  {...PRESENTATION_SECTION_FIELDS.title}
                  value={formData['sections'][i] || ''}
                  onChange={onFieldChange('section')}
                  error={
                    wasSubmitted &&
                    PRESENTATION_SECTION_FIELDS.referenceName.required &&
                    !formData.referenceName
                  }
                  fullWidth
                />
              </Grid>
            </Grid>
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
