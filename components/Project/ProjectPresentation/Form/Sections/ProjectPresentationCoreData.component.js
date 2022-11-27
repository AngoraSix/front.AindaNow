import { Box, Grid, TextField } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { PROJECT_PRESENTATION_CORE_FORM_FIELDS as PRESENTATION_CORE_FIELDS } from '../ProjectPresentationForm.properties';

const ProjectPresentationCoreData = ({
  formData,
  onFormChange,
  wasSubmitted,
  setIsCompleted,
}) => {
  const { t } = useTranslation('project-presentations.edit');
  useEffect(() => {
    setIsCompleted(!!formData[PRESENTATION_CORE_FIELDS.referenceName.key]);
  }, []);

  const onFieldChange = (property) => (event) => {
    let {
      target: { value },
    } = event;

    value ? setIsCompleted(true) : setIsCompleted(false);
    onFormChange(property)(value);
  };

  return (
    <Box className="ProjectPresentationCoreData ProjectPresentationCoreData__Container ProjectPresentationForm__Section__Container">
      <Grid
        className="ProjectPresentationForm__Section__Fields ProjectPresentationCoreData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10}>
          <TextField
            {...PRESENTATION_CORE_FIELDS.referenceName}
            label={
              formData.referenceName
                ? t('project-presentations.edit.form.fields.reference-name')
                : t(PRESENTATION_CORE_FIELDS.referenceName.label)
            }
            value={formData[PRESENTATION_CORE_FIELDS.referenceName.key] || ''}
            onChange={onFieldChange(PRESENTATION_CORE_FIELDS.referenceName.key)}
            error={
              wasSubmitted &&
              PRESENTATION_CORE_FIELDS.referenceName.required &&
              !formData.referenceName
            }
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

ProjectPresentationCoreData.defaultProps = {
  formData: {},
  setIsCompleted: () => {},
  wasSubmitted: false,
};

ProjectPresentationCoreData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  setIsCompleted: PropTypes.func,
  wasSubmitted: PropTypes.bool,
};

export default ProjectPresentationCoreData;
