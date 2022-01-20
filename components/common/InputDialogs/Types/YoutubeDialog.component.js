import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, DialogContentText, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const YoutubeDialog = ({
  isValid,
  videoId,
  thumbnailUrl,
  fieldValue,
  onChange,
  label,
}) => {
  const visibleVideoId =
    !isValid && videoId.length > 15
      ? `...${videoId.substring(videoId.length - 15)}`
      : videoId;
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
        <Box className="YoutubeDialog__Thumbnail">
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
        </Box>
        <TextField
          label="Video ID or URL"
          value={fieldValue}
          onChange={onChange}
          fullWidth
        />
      </Box>
    </Box>
  );
};

YoutubeDialog.defaultProps = {
  fieldValue: '',
  label: 'Set new value',
  isValid: false,
  videoId: '',
  thumbnailUrl: '',
};

YoutubeDialog.propTypes = {
  onChange: PropTypes.func.isRequired,
  fieldValue: PropTypes.string,
  label: PropTypes.string,
  isValid: PropTypes.bool,
  videoId: PropTypes.string,
  thumbnailUrl: PropTypes.string,
};

export default YoutubeDialog;
