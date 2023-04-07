import NewIconContained from '@mui/icons-material/AddCircle';
import NewIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { createObjectFromFlatParams } from '../../../../../utils/helpers';
import { PROJECT_PRESENTATION_SECTION_FORM_FIELDS as PRESENTATION_SECTION_FIELDS } from '../ProjectPresentationForm.properties';
import PresentationSectionMediaData from './PresentationSectionMediaData.component';

const SECTIONS_PARENT_FORM_DATA_PATH = 'sections';

const REQUIRED_SECTION_FIELDS = Object.entries(PRESENTATION_SECTION_FIELDS)
  .filter(([_, value]) => value.required)
  .map(([key]) => key);

const _normalizeSectionsFormData = (formData) => {
  return Object.assign(
    {},
    ...Object.entries(formData)
      .filter(([formKey]) => formKey.startsWith(SECTIONS_PARENT_FORM_DATA_PATH))
      .map(([formKey, formValue]) => ({
        [formKey.replace(SECTIONS_PARENT_FORM_DATA_PATH, 'sections')]:
          formValue,
      }))
  );
};

const _convertFormDataToSectionsObj = (formData) => {
  const sectionsObj = _normalizeSectionsFormData(formData);
  return createObjectFromFlatParams(sectionsObj).sections || [];
};

const _sectionIsComplete = (section) => {
  return REQUIRED_SECTION_FIELDS.every((reqField) => {
    return section[reqField] != null && section[reqField] !== '';
  });
};

const _determineIfIsComplete = (formData) => {
  const sections = _convertFormDataToSectionsObj(formData);
  return sections.length && sections.every((s) => _sectionIsComplete(s));
};

const _determineIfHasError = (fieldSpecs, wasSubmitted, formData, i) => {
  return (
    wasSubmitted &&
    fieldSpecs.required &&
    !formData[`${SECTIONS_PARENT_FORM_DATA_PATH}[${i}].${fieldSpecs.key}`]
  );
};

const ProjectPresentationsSectionsData = ({
  formData,
  onFormChange,
  wasSubmitted,
  setIsCompleted,
}) => {
  const { t } = useTranslation('project-presentations.edit');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setIsCompleted(_determineIfIsComplete({ ...formData }));
  }, [formData, setIsCompleted]);

  const handleFocusChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onNestedFormChange = (index) => (nestedField, value) => {
    const modifiedKey = `${SECTIONS_PARENT_FORM_DATA_PATH}[${index}].${nestedField}`;
    setIsCompleted(
      _determineIfIsComplete({ ...formData, [modifiedKey]: value })
    );
    onFormChange(modifiedKey)(value);
  };

  const onDirectFormChange = (index, field) => (event) => {
    let {
      target: { value },
    } = event;
    const modifiedKey = `${SECTIONS_PARENT_FORM_DATA_PATH}[${index}].${field}`;
    setIsCompleted(
      _determineIfIsComplete({ ...formData, [modifiedKey]: value })
    );
    onFormChange(modifiedKey)(value);
  };

  const onAddNewSection = (currentQtyOfSections) => () => {
    setIsCompleted(false);
    setExpanded(currentQtyOfSections);
    onFormChange(
      `${SECTIONS_PARENT_FORM_DATA_PATH}[${currentQtyOfSections}].${PRESENTATION_SECTION_FIELDS.title.key}`
    )('');
  };

  const onRemoveSection = (index, currentQtyOfSections) => () => {
    let adjustedSectionsFieldsIndexes;
    if (index === currentQtyOfSections - 1) {
      // if it's the last section, we simply remove it's fields
      adjustedSectionsFieldsIndexes = Object.entries(formData)
        .filter(([key]) =>
          key.startsWith(`${SECTIONS_PARENT_FORM_DATA_PATH}[${index}]`)
        )
        .map(([key]) => [key, undefined]);
    } else {
      // otherwise we move down the indexes by one since the removed index
      const reducedFields = Object.entries(formData).filter(([key]) =>
        key.startsWith(`${SECTIONS_PARENT_FORM_DATA_PATH}`)
      );
      const updatedIndexes = reducedFields
        .map(([key, value]) => {
          const itemIndex = key
            .split(`${SECTIONS_PARENT_FORM_DATA_PATH}[`)[1]
            ?.split(']')[0];
          return itemIndex > index
            ? [
                key.replace(
                  `${SECTIONS_PARENT_FORM_DATA_PATH}[${itemIndex}]`,
                  `${SECTIONS_PARENT_FORM_DATA_PATH}[${itemIndex - 1}]`
                ),
                value,
              ]
            : null;
        })
        .filter((entry) => entry != null);
      const deletedLastItemFields = reducedFields
        .filter(([key]) =>
          key.startsWith(
            `${SECTIONS_PARENT_FORM_DATA_PATH}[${currentQtyOfSections - 1}]`
          )
        )
        .map(([key]) => [key, null]);
      adjustedSectionsFieldsIndexes = [
        ...updatedIndexes,
        ...deletedLastItemFields,
      ];
    }
    setIsCompleted(
      _determineIfIsComplete({ ...formData, ...adjustedSectionsFieldsIndexes })
    );
    onFormChange(null)(adjustedSectionsFieldsIndexes);
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
  const sections = _convertFormDataToSectionsObj(formData);

  return (
    <Box className="ProjectPresentationsSectionsData ProjectPresentationsSectionsData__Container ProjectForm__Section__Container">
      {sections.map((s, i) => {
        const titleHasError = _determineIfHasError(
          PRESENTATION_SECTION_FIELDS.title,
          wasSubmitted,
          formData,
          i
        );
        const descriptionHasError = _determineIfHasError(
          PRESENTATION_SECTION_FIELDS.description,
          wasSubmitted,
          formData,
          i
        );
        return (
          <Accordion
            className={classnames(
              'ProjectPresentationsSectionsData__Accordion',
              {
                'ProjectPresentationsSectionsData__Accordion--error':
                  wasSubmitted && !_sectionIsComplete(s),
              }
            )}
            key={i}
            expanded={expanded === i}
            onChange={handleFocusChange(i)}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              className="ProjectPresentationsSectionsData__Summary"
              aria-controls={`${i}-content1`}
              id={`${i}-header`}
            >
              <Typography
                className="ProjectPresentationsSectionsData__Summary__Text Long"
                noWrap={true}
              >
                {s.title}
              </Typography>
              <IconButton
                onClick={onRemoveSection(i, sections.length)}
                className="ProjectPresentationsSectionsData__Summary__Button"
                color="primary"
                size="small"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              <Box className="ProjectPresentationsSectionsData__Field">
                <TextField
                  {...PRESENTATION_SECTION_FIELDS.title}
                  label={
                    formData.title
                      ? t(
                          'project-presentations.edit.form.fields.section.title'
                        )
                      : t(PRESENTATION_SECTION_FIELDS.title.label)
                  }
                  value={
                    formData[
                      `${SECTIONS_PARENT_FORM_DATA_PATH}[${i}].${PRESENTATION_SECTION_FIELDS.title.key}`
                    ] || ''
                  }
                  onChange={onDirectFormChange(
                    i,
                    PRESENTATION_SECTION_FIELDS.title.key
                  )}
                  error={titleHasError}
                  fullWidth
                />
              </Box>
              <Box className="ProjectPresentationsSectionsData__Field">
                <TextField
                  {...PRESENTATION_SECTION_FIELDS.description}
                  label={
                    formData.description
                      ? t(
                          'project-presentations.edit.form.fields.section.description'
                        )
                      : t(PRESENTATION_SECTION_FIELDS.description.label)
                  }
                  value={
                    formData[
                      `${SECTIONS_PARENT_FORM_DATA_PATH}[${i}].${PRESENTATION_SECTION_FIELDS.description.key}`
                    ] || ''
                  }
                  onChange={onDirectFormChange(
                    i,
                    PRESENTATION_SECTION_FIELDS.description.key
                  )}
                  error={descriptionHasError}
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
        );
      })}
      <Box className="ProjectPresentationsSectionsData__ListActions">
        <Button
          onClick={onAddNewSection(sections.length)}
          color={wasSubmitted && !sections.length ? 'error' : 'primary'}
          variant="contained"
          startIcon={<NewIcon />}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          {t('project-presentations.edit.form.commands.add-section')}
        </Button>
        <IconButton
          onClick={onAddNewSection(sections.length)}
          aria-label="create"
          color={wasSubmitted && !sections.length ? 'error' : 'primary'}
          sx={{ display: { xs: 'flex', sm: 'none' } }}
        >
          <NewIconContained />
        </IconButton>
      </Box>
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
