import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_INPUT_STRATEGIES } from '../../../../../constants';
import { asArray } from '../../../../../utils/helpers';
import Media from '../../../../common/Media';
import { PROJECT_PRESENTATION_SECTION_FORM_FIELDS as PRESENTATION_SECTION_FIELDS } from '../ProjectPresentationForm.properties';

const ProjectPresentationMediaData = ({
  presentationFormData,
  onFormChange,
  setIsCompleted,
  wasSubmitted,
  presentationIndex,
}) => {
  const onMediaChange =
    (innerField, isRequired = false) =>
    (mediaData) => {
      const updatedSections = [...(presentationFormData.sections || [])];
      if (
        !presentationFormData.sections ||
        !presentationFormData.sections[presentationIndex]
      ) {
        updatedSections[presentationIndex] = {};
      }
      updatedSections[presentationIndex][innerField] = mediaData;
      if (isRequired && mediaData.length) {
        // there is only one required field here
        setIsCompleted(true);
      }
      onFormChange({ ...presentationFormData, sections: updatedSections });
    };

  return (
    <Box className="ProjectPresentationMediaData ProjectPresentationMediaData__Container">
      <Grid
        className="ProjectPresentationMediaData__MainMedia"
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
              'mainMedia',
              PRESENTATION_SECTION_FIELDS.mainMedia.required
            )}
            mediaData={asArray(
              presentationFormData.sections?.[presentationIndex]?.mainMedia
            )}
            error={
              wasSubmitted &&
              PRESENTATION_SECTION_FIELDS.mainMedia.required &&
              !presentationFormData.sections?.[presentationIndex]?.mainMedia
            }
          />
        </Grid>
      </Grid>
      <Grid
        className="ProjectForm__Section__Fields ProjectPresentationMediaData__Fields"
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={10}>
          <Typography>{PRESENTATION_SECTION_FIELDS.media.label}</Typography>
          <Media
            allowsMultiple={true}
            strategy={MEDIA_INPUT_STRATEGIES.LIST}
            onChange={onMediaChange(
              'media',
              PRESENTATION_SECTION_FIELDS.media.required
            )}
            mediaData={
              presentationFormData.sections?.[presentationIndex]?.media
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

ProjectPresentationMediaData.defaultProps = {
  presentationFormData: {},
  setIsCompleted: () => {},
  wasSubmitted: false,
  fullWidth: false,
};

ProjectPresentationMediaData.propTypes = {
  presentationFormData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  setIsCompleted: PropTypes.func,
  wasSubmitted: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default ProjectPresentationMediaData;
