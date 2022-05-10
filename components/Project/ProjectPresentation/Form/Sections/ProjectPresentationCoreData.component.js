import { Box, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { PROJECT_PRESENTATION_CORE_FORM_FIELDS as PRESENTATION_CORE_FIELDS } from '../ProjectPresentationForm.properties';

const ProjectPresentationCoreData = ({
  formData,
  onFormChange,
  onSaveFormField,
  wasSubmitted,
}) => {
  const onFieldChange = (property) => (event) => {
    let {
      target: { value },
    } = event;

    // we only have one field in this section
    value ? setIsCompleted(true) : setIsCompleted(false);
    onFormChange(property)(event);
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
            value={formData['referenceName'] || ''}
            onChange={onFieldChange('referenceName')}
            onBlur={onSaveFormField('referenceName')}
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
  withDescription: false,
  isNotMobile: false,
  setIsCompleted: () => {},
  wasSubmitted: false,
};

ProjectPresentationCoreData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
  setIsCompleted: PropTypes.func,
  wasSubmitted: PropTypes.bool,
};

export default ProjectPresentationCoreData;
