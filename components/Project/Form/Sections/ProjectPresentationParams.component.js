import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';
import TagsInput from '../../../common/TagsInput';
import { PROJECT_PRESENTATION_PARAMS_FIELDS as PRESENTATION_PARAMS_FIELDS } from '../ProjectForm.properties';

const MOBILE_DESCRIPTION =
  'projects.edit.form.steps.step.params.description.mobile';

const FULL_DESCRIPTION =
  'projects.edit.form.steps.step.params.description.full';

const supportedLanguages = ['es', 'en', 'pt', 'it', 'de', 'fr'];

const ProjectPresentationParams = ({
  formData,
  onFormChange,
  withDescription,
  isMobile,
  onInputKeyPressed,
}) => {
  const { t } = useTranslation([
    'projects.edit',
    'project-presentations.edit',
    'common.languages',
  ]);

  return (
    <div className="ProjectPresentationParams ProjectPresentationParams__Container ProjectForm__Section__Container">
      {withDescription && (
        <Box className="ProjectForm__Description ProjectPresentationParams__Description">
          <Typography>
            {t(isMobile ? FULL_DESCRIPTION : MOBILE_DESCRIPTION)}
          </Typography>
        </Box>
      )}
      <Grid
        className="ProjectForm__Section__Fields ProjectPresentationParams__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={5}>
          <FormControl fullWidth>
            <InputLabel id="project-edit-field-language">
              {formData.description
                ? t('project-presentations.edit.form.fields.language', {
                    ns: 'project-presentations.edit',
                  })
                : t(PRESENTATION_PARAMS_FIELDS.language.label, {
                    ns: 'project-presentations.edit',
                  })}
            </InputLabel>
            <Select
              {...PRESENTATION_PARAMS_FIELDS.language}
              labelId="project-edit-field-language"
              id="project-edit-field-language"
              value={formData['presentation.params.language'] || ''}
              label={
                formData.description
                  ? t('project-presentations.edit.form.fields.language', {
                      ns: 'project-presentations.edit',
                    })
                  : t(PRESENTATION_PARAMS_FIELDS.language.label, {
                      ns: 'project-presentations.edit',
                    })
              }
              onChange={(ev) => {
                onInputKeyPressed(ev);
                onFormChange('presentation.params.language')(ev);
              }}
            >
              {supportedLanguages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {t(`common.languages.${lang}`, {
                    ns: 'common.languages',
                  })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={5}>
          {/* <TagsInput
            {...PRESENTATION_PARAMS_FIELDS.skills}
            label={
              formData.skills
                ? t('project-presentations.edit.form.fields.skills', {
                    ns: 'project-presentations.edit',
                  })
                : t(PRESENTATION_PARAMS_FIELDS.skills.label, {
                    ns: 'project-presentations.edit',
                  })
            }
            selectedTags={onFormChange('presentation.params.skills')}
            id="tags"
            name="tags"
            fullWidth
          /> */}
        </Grid>
      </Grid>
    </div>
  );
};

ProjectPresentationParams.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
  onInputKeyPressed: (e) => {
    e.key === 'Enter' && e.preventDefault();
  },
};

ProjectPresentationParams.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
  onInputKeyPressed: PropTypes.func,
};

export default ProjectPresentationParams;
