import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Button,
  DialogContentText,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from "next/legacy/image";
import PropTypes from 'prop-types';
import React from 'react';
import config from '../../../../../config';
import { INPUT_FIELD_TYPES, MEDIA_TYPES } from '../../../../../constants';
import { useNotifications } from '../../../../../hooks/app';
import DnDContainer from '../../../Media/DnDContainer.component';

const YoutubeInput = ({ isValid, videoMedia, fieldValue, onChange, label }) => {
  const { t } = useTranslation('common');
  const { onError } = useNotifications();

  const thumbnailUrl = videoMedia?.thumbnailUrl,
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
        <DnDContainer
          onMediaInput={handleDrop}
          classNameModifier="Youtube"
          allowedMediaTypes={[MEDIA_TYPES.VIDEO_YOUTUBE]}
        >
          {!!thumbnailUrl ? (
            <Box className="Commons__NextImageContainer">
              <Image
                alt={label}
                className="YoutubeDialog__Thumbnail__Preview"
                src={thumbnailUrl}
                layout="fill"
                fill={true}
                placeholder="blur"
                blurDataURL={thumbnailUrl}
              />
            </Box>
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
          label={t('common.input-dialog.youtube.video-id')}
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
