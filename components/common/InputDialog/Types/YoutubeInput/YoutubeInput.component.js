import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Button,
  DialogContentText,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../../../config';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DnDContainer from '../../../Media/DnDContainer.component';
import { useNotifications } from '../../../../../hooks/app';
import { INPUT_FIELD_TYPES } from '../../../../../constants';

const YoutubeInput = ({ isValid, videoMedia, fieldValue, onChange, label }) => {
  const { onError } = useNotifications();

  const thumbnailUrl = videoMedia.thumbnailUrl,
    videoId = videoMedia.resourceId,
    visibleVideoId =
      !isValid && videoId.length > 15
        ? `...${videoId.substring(videoId.length - 15)}`
        : videoId;

  const handleChange = ({ target: { value } }) => {
    onChange(value);
  };

  const handleDrop = (processedMedia) => {
    if (
      !processedMedia ||
      processedMedia.length !== 1 ||
      processedMedia[0].mediaType !== INPUT_FIELD_TYPES.YOUTUBEVIDEO
    ) {
      onError("Couldn't process Youtube video URL");
    } else {
      onChange(null, processedMedia[0]);
    }
  };

  return (
    <Box>
      {label && <DialogContentText>{label}</DialogContentText>}
      <Box className="YoutubeDialog__Container">
        <Box
          className={`YoutubeDialog__VideoId ${
            !isValid && !!videoId ? 'YoutubeDialog__VideoId__Error' : ''
          }`}
        >
          <Typography>{visibleVideoId || '-'}</Typography>
        </Box>
        <DnDContainer onMediaInput={handleDrop} classNameModifier="Youtube">
          {!!thumbnailUrl ? (
            <img
              className="YoutubeDialog__Thumbnail__Preview"
              src={thumbnailUrl}
            />
          ) : (
            <div className="YoutubeDialog__Thumbnail__PreviewPlaceholder">
              <YouTubeIcon
                className="YoutubeDialog__Thumbnail__PreviewPlaceholder__Icon"
                sx={{ fontSize: 75 }}
                color="disabled"
              />
            </div>
          )}
        </DnDContainer>
        <TextField
          label="Video ID or URL"
          value={fieldValue}
          onChange={handleChange}
          fullWidth
        />
        <a href={config.thirdPartiesConfig.youtube.uploadPage} target="_blank">
          <Button
            className="YoutubeDialog__Upload"
            variant="outlined"
            size="small"
            endIcon={<OpenInNewIcon />}
          >
            Youtube Studio
          </Button>
        </a>
      </Box>
    </Box>
  );
};

YoutubeInput.defaultProps = {
  fieldValue: '',
  label: 'Set new value',
  isValid: false,
  videoId: '',
  thumbnailUrl: '',
};

YoutubeInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  fieldValue: PropTypes.string,
  label: PropTypes.string,
  isValid: PropTypes.bool,
  videoId: PropTypes.string,
  thumbnailUrl: PropTypes.string,
};

export default YoutubeInput;
