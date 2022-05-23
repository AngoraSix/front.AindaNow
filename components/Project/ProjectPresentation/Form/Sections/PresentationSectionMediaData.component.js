import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_INPUT_STRATEGIES } from '../../../../../constants';
import { asArray } from '../../../../../utils/helpers';
import Media from '../../../../common/Media';
import { PROJECT_PRESENTATION_SECTION_FORM_FIELDS as PRESENTATION_SECTION_FIELDS } from '../ProjectPresentationForm.properties';

const PresentationSectionMediaData = ({
  formData,
  onFormChange,
  setIsCompleted,
  wasSubmitted,
}) => {
  const onMediaChange =
    (innerField, isRequired = false) =>
    (mediaData) => {
      if (isRequired && mediaData.length) {
        // there is only one required field here
        setIsCompleted(true);
      }
      onFormChange(innerField, mediaData);
    };

  return (
    <Box className="PresentationSectionMediaData PresentationSectionMediaData__Container">
      <Grid
        className="PresentationSectionMediaData__MainMedia"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10} sm={6}>
          <Typography>{PRESENTATION_SECTION_FIELDS.mainMedia.label}</Typography>
          <Media
            allowsMultiple={false}
            strategy={MEDIA_INPUT_STRATEGIES.SINGLE}
            onChange={onMediaChange(
              PRESENTATION_SECTION_FIELDS.mainMedia.key,
              PRESENTATION_SECTION_FIELDS.mainMedia.required
            )}
            mediaData={asArray(
              formData[PRESENTATION_SECTION_FIELDS.mainMedia.key]
            )}
            error={
              wasSubmitted &&
              PRESENTATION_SECTION_FIELDS.mainMedia.required &&
              !formData[PRESENTATION_SECTION_FIELDS.mainMedia.key]
            }
          />
        </Grid>
      </Grid>
      <Grid
        className="ProjectForm__Section__Fields PresentationSectionMediaData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography>{PRESENTATION_SECTION_FIELDS.media.label}</Typography>
          <Media
            allowsMultiple={true}
            strategy={MEDIA_INPUT_STRATEGIES.LIST}
            onChange={onMediaChange(
              PRESENTATION_SECTION_FIELDS.media.key,
              PRESENTATION_SECTION_FIELDS.media.required
            )}
            mediaData={asArray(formData[PRESENTATION_SECTION_FIELDS.media.key])}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

PresentationSectionMediaData.defaultProps = {
  formData: {},
  setIsCompleted: () => {},
  wasSubmitted: false,
};

PresentationSectionMediaData.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  setIsCompleted: PropTypes.func,
  wasSubmitted: PropTypes.bool,
};

export default PresentationSectionMediaData;
