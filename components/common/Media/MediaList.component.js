import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PreviewIcon from '@mui/icons-material/Preview';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { INPUT_FIELD_TYPES, MEDIA_OPTIONS } from '../../../constants';
import InputDialog from '../InputDialogs';

const MEDIA_OPTIONS_MAP = {
  [MEDIA_OPTIONS.IMAGE]: {
    icon: ImageIcon,
    label: 'Image',
    dialogLabel: 'Upload new image',
    inputType: INPUT_FIELD_TYPES.IMAGE,
  },
  [MEDIA_OPTIONS.VIDEO_YOUTUBE]: {
    icon: YouTubeIcon,
    label: 'Video',
    dialogLabel: 'Introduce the Youtube video ID or URL',
    inputType: INPUT_FIELD_TYPES.YOUTUBEVIDEO,
  },
};

const MediaList = ({ options, limit }) => {
  const [mediaValues, setMediaValues] = useState([]);
  const [openedDialogType, setOpenedDialogType] = React.useState(null);

  const handleDialogClickOpen = (type) => () => {
    setOpenedDialogType(MEDIA_OPTIONS_MAP[type].inputType);
  };

  const handleDialogClose = () => {
    setOpenedDialogType(null);
  };

  const addMedia = async (media) => {
    setMediaValues(mediaValues.push(media));
  };

  return (
    <Box>
      <List>
        {mediaValues.map((media, index) => {
          const MediaIcon = MEDIA_OPTIONS_MAP[media.type].icon;
          return (
            <ListItem
              key={index}
              secondaryAction={
                <Box>
                  <IconButton edge="end" aria-label="preview">
                    <PreviewIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <MediaIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={media.value} secondary={media.type} />
            </ListItem>
          );
        })}
      </List>
      {mediaValues.length < limit && (
        <Box>
          Add new media
          {options.map((option) => {
            const OptionIcon = MEDIA_OPTIONS_MAP[option].icon;
            return (
              <Button
                key={option}
                variant="outlined"
                startIcon={<OptionIcon />}
                onClick={handleDialogClickOpen(option)}
              >
                {MEDIA_OPTIONS_MAP[option].label}
              </Button>
            );
          })}
        </Box>
      )}
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
