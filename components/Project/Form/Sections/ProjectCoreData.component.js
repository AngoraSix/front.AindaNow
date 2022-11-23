import { Box, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import { PROJECT_CORE_FORM_FIELDS as CORE_FIELDS } from '../ProjectForm.properties';

const MOBILE_DESCRIPTION =
  'projects.edit.form.steps.step.core.description.mobile';

const FULL_DESCRIPTION = 'projects.edit.form.steps.step.core.description.full';

const ProjectCoreData = ({
  formData,
  onFormChange,
  withDescription,
  isMobile,
  setIsCompleted,
  wasSubmitted,
  onInputKeyPressed,
}) => {
  const { t } = useTranslation('projects.edit');
  const onFieldChange = (property) => (event) => {
    let {
      target: { value },
    } = event;

    // we only have one field in this section
    value ? setIsCompleted(true) : setIsCompleted(false);
    onFormChange(property)(event);
  };

  return (
    <div className="ProjectCoreData ProjectCoreData__Container ProjectForm__Section__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectCoreData__Description">
          <Typography>
            {t(isMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION)}
          </Typography>
        </Box>
      )}
      <Grid
        className="ProjectForm__Section__Fields ProjectCoreData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10}>
          <TextField
            {...CORE_FIELDS.name}
            label={
              formData.name
                ? t('projects.edit.form.fields.project-name')
                : t(CORE_FIELDS.name.label)
            }
            value={formData.name || ''}
            onChange={onFieldChange('name')}
            fullWidth
            error={wasSubmitted && CORE_FIELDS.name.required && !formData.name}
            onKeyPress={onInputKeyPressed}
          />
        </Grid>
      </Grid>
    </div>
  );
};

ProjectCoreData.defaultProps = {
  formData: {},
  withDescription: false,
  isMobile: true,
  setIsCompleted: () => {},
  onInputKeyPressed: (e) => {
    e.key === 'Enter' && e.preventDefault();
  },
};

ProjectCoreData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isMobile: PropTypes.bool,
  wasSubmitted: PropTypes.bool,
  setIsCompleted: PropTypes.func,
  onInputKeyPressed: PropTypes.func,
};

export default ProjectCoreData;
