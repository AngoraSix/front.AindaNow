import { Box, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { PROJECT_PRESENTATION_SECTION_BASE_FORM_FIELDS as PRESENTATION_BASE_FIELDS } from '../ProjectForm.properties';

const MOBILE_DESCRIPTION =
  'projects.edit.form.steps.step.presentation.description.mobile';

const FULL_DESCRIPTION =
  'projects.edit.form.steps.step.presentation.description.full';

const ProjectPresentationData = ({
  formData,
  onFormChange,
  withDescription,
  isMobile,
  setIsCompleted,
  wasSubmitted,
}) => {
  const { t } = useTranslation(['projects.edit', 'project-presentations.edit']);
  const onFieldChange = (property) => (event) => {
    let {
      target: { value },
    } = event;

    // we only have one field in this section
    value ? setIsCompleted(true) : setIsCompleted(false);
    onFormChange(property)(event);
  };

  return (
    <Box className="ProjectPresentationData ProjectPresentationData__Container ProjectForm__Section__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectPresentationData__Description">
          <Typography>
            {t(isMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION)}
          </Typography>
        </Box>
      )}
      <Grid
        className="ProjectForm__Section__Fields ProjectPresentationData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10}>
          <TextField
            {...PRESENTATION_BASE_FIELDS.description}
            label={
              formData.description
                ? t('project-presentations.edit.form.fields.description', {
                    ns: 'project-presentations.edit',
                  })
                : t(PRESENTATION_BASE_FIELDS.description.label, {
                    ns: 'project-presentations.edit',
                  })
            }
            value={formData['presentations[0].sections[0].description'] || ''}
            onChange={onFieldChange('presentations[0].sections[0].description')}
            error={
              wasSubmitted &&
              PRESENTATION_BASE_FIELDS.description.required &&
              !formData.description
            }
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

ProjectPresentationData.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
  setIsCompleted: () => {},
  wasSubmitted: false,
};

ProjectPresentationData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
  setIsCompleted: PropTypes.func,
  wasSubmitted: PropTypes.bool,
};

export default ProjectPresentationData;
