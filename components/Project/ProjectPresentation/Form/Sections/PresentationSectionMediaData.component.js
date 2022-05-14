import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_INPUT_STRATEGIES } from '../../../../../constants';
import { asArray } from '../../../../../utils/helpers';
import Media from '../../../../common/Media';
import { PROJECT_PRESENTATION_SECTION_FORM_FIELDS as PRESENTATION_SECTION_FIELDS } from '../ProjectPresentationForm.properties';

const PresentationSectionMediaData = ({
  sectionsFormData,
  onSectionsChange,
  setIsCompleted,
  wasSubmitted,
  presentationIndex,
}) => {
  const onMediaChange =
    (innerField, isRequired = false) =>
    (mediaData) => {
      const updatedSections = [...(sectionsFormData || [])];
      if (!sectionsFormData || !sectionsFormData[presentationIndex]) {
        updatedSections[presentationIndex] = {};
      }
      updatedSections[presentationIndex][innerField] = mediaData;
      if (isRequired && mediaData.length) {
        // there is only one required field here
        setIsCompleted(true);
      }
      onSectionsChange(updatedSections);
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
              'mainMedia',
              PRESENTATION_SECTION_FIELDS.mainMedia.required
            )}
            mediaData={asArray(sectionsFormData[presentationIndex]?.mainMedia)}
            error={
              wasSubmitted &&
              PRESENTATION_SECTION_FIELDS.mainMedia.required &&
              !sectionsFormData[presentationIndex]?.mainMedia
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
              'media',
              PRESENTATION_SECTION_FIELDS.media.required
            )}
            mediaData={sectionsFormData[presentationIndex]?.media}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

PresentationSectionMediaData.defaultProps = {
  sectionsFormData: [],
  setIsCompleted: () => {},
  wasSubmitted: false,
  fullWidth: false,
};

PresentationSectionMediaData.propTypes = {
  sectionsFormData: PropTypes.array,
  onSectionsChange: PropTypes.func.isRequired,
  setIsCompleted: PropTypes.func,
  wasSubmitted: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default PresentationSectionMediaData;
