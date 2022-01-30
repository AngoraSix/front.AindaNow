import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PreviewIcon from '@mui/icons-material/Preview';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { INPUT_FIELD_TYPES, MEDIA_OPTIONS } from '../../../constants';
import InputDialog from '../InputDialogs';
import { useTheme } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';

const MEDIA_OPTIONS_MAP = {
  [MEDIA_OPTIONS.IMAGE]: {
    icon: ImageIcon,
    label: 'Image',
    dialogLabel: 'Upload new image',
    inputType: INPUT_FIELD_TYPES.IMAGE,
    classModifier: 'Image',
  },
  [MEDIA_OPTIONS.VIDEO_YOUTUBE]: {
    icon: YouTubeIcon,
    label: 'Video',
    dialogLabel: 'Introduce the Youtube video ID or URL',
    inputType: INPUT_FIELD_TYPES.YOUTUBEVIDEO,
    classModifier: 'Youtube',
  },
};

const MEDIA_OPTIONS_IMPORTANCE = {
  [MEDIA_OPTIONS.IMAGE]: 1,
  [MEDIA_OPTIONS.VIDEO_YOUTUBE]: 2,
};

const _mapMediaValue = (mediaValue) => {
  mediaValue = Array.isArray(mediaValue) ? mediaValue : [mediaValue];
  return mediaValue.map((mValue) =>
    mValue instanceof File
      ? {
          type: INPUT_FIELD_TYPES.IMAGE,
          thumbnailUrl: mValue.blob,
          file: mValue,
        }
      : mValue
  );
};

const MediaList = ({ options, limit }) => {
  const [mediaValues, setMediaValues] = useState([]);
  const [openedDialogType, setOpenedDialogType] = React.useState(null);
  const [newOptionsVisible, setNewOptionsVisible] = useState(false);
  const isNotMobile = useMediaQuery('(min-width:600px)');
  const isMedium = useMediaQuery('(min-width:900px)');
  const isLarge = useMediaQuery('(min-width:1200px)');
  const theme = useTheme();

  const handleShowNewOptions = () => {
    setNewOptionsVisible(!newOptionsVisible);
  };

  const handleDialogClickOpen = (type) => () => {
    setOpenedDialogType(MEDIA_OPTIONS_MAP[type].inputType);
  };

  const handleDialogClose = () => {
    setOpenedDialogType(null);
  };

  const addMedia = async (media) => {
    const normalizedMedia = _mapMediaValue(media);
    setMediaValues([...mediaValues, ...normalizedMedia]);
  };

  return (
    <Box>
      <Box className="MediaList__Container">
        <Box className="MediaList__Add__Options">
          {!isNotMobile && (
            <IconButton
              className="MediaList__New__Option"
              key="new"
              onClick={handleShowNewOptions}
            >
              <AddIcon
                className={`MediaList__New__Option__Icon ${
                  newOptionsVisible
                    ? 'MediaList__New__Option__Icon__Close'
                    : 'MediaList__New__Option__Icon__Add'
                }`}
              />
            </IconButton>
          )}
          {options.map((option) => {
            const OptionIcon = MEDIA_OPTIONS_MAP[option].icon;
            return isNotMobile ? (
              <Button
                className={`MediaList__Option MediaList__Option__${
                  MEDIA_OPTIONS_MAP[option].classModifier || ''
                }`}
                key={option}
                startIcon={<OptionIcon />}
                onClick={handleDialogClickOpen(option)}
                disabled={mediaValues.length >= limit}
              >
                {MEDIA_OPTIONS_MAP[option].label}
              </Button>
            ) : (
              <IconButton
                className={`MediaList__Option ${
                  newOptionsVisible
                    ? 'MediaList__Option__Visible'
                    : 'MediaList__Option__Hidden'
                } MediaList__Option__${
                  MEDIA_OPTIONS_MAP[option].classModifier || ''
                }`}
                key={option}
                onClick={handleDialogClickOpen(option)}
                disabled={mediaValues.length >= limit}
              >
                <OptionIcon
                  className={`MediaList__Option__Icon ${
                    newOptionsVisible
                      ? 'MediaList__Option__Icon__Visible'
                      : 'MediaList__Option__Icon__Hidden'
                  }`}
                />
              </IconButton>
            );
          })}
        </Box>
      </Box>
      <Box className="MediaList__List__Container">
        {!mediaValues ||
          (!mediaValues.length && (
            <Typography className="MediaList__EmptyMessage" align="center">
              Click above or drop image file or Youtube link
            </Typography>
          ))}
        <ImageList
          className="MediaList__List"
          variant="quilted"
          cols={isLarge ? 6 : isMedium ? 4 : 2}
          rowHeight={121}
        >
          {mediaValues.map((media, index) => {
            const MediaIcon = MEDIA_OPTIONS_MAP[media.type].icon;
            return (
              <ImageListItem
                cols={MEDIA_OPTIONS_IMPORTANCE[media.type] || 1}
                rows={MEDIA_OPTIONS_IMPORTANCE[media.type] || 1}
                key={index}
              >
                <img
                  src={media.thumbnailUrl}
                  // alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  actionIcon={
                    <Box>
                      <IconButton edge="end" aria-label="preview">
                        <PreviewIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>

      <InputDialog
        open={!!openedDialogType}
        inputType={openedDialogType}
        handleDialogClose={handleDialogClose}
        onInputSubmit={addMedia}
        label={MEDIA_OPTIONS_MAP[openedDialogType]?.dialogLabel}
      />
    </Box>
  );
};

MediaList.defaultProps = { options: Object.values(MEDIA_OPTIONS), limit: 15 };

MediaList.propTypes = { options: PropTypes.array, limit: PropTypes.number };

export default MediaList;
