import AddIcon from '@mui/icons-material/Add';
import FileIcon from '@mui/icons-material/FilePresent';
import ImageIcon from '@mui/icons-material/Image';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, IconButton, ImageList, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { INPUT_FIELD_TYPES, MEDIA_OPTIONS } from '../../../../../constants';
import InputDialog from '../../../InputDialog';
import DnDContainer from '../../DnDContainer.component';
import MediaListCard from './MediaListCard.component';

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

const MEDIA_OPTIONS_GRID_SIZE = {
  [MEDIA_OPTIONS.IMAGE]: 1,
  [MEDIA_OPTIONS.VIDEO_YOUTUBE]: 1,
};

const _getQuantityOfColumns = (isMedium, isLarge) =>
  isLarge ? 6 : isMedium ? 4 : 2;

const MediaListDnD = ({
  limit,
  media,
  allowedMediaTypes,
  onMediaInput,
  onModifyMediaOrder,
}) => {
  const [openedDialogType, setOpenedDialogType] = useState(null);
  const [newOptionsVisible, setNewOptionsVisible] = useState(false);
  const [tempOrderChangeKeys, setTempOrderChangeKeys] = useState({
    targetKey: null,
    originKey: null,
  });
  const isNotMobile = useMediaQuery('(min-width:600px)');
  const isMedium = useMediaQuery('(min-width:900px)');
  const isLarge = useMediaQuery('(min-width:1200px)');

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
    onMediaInput(media);
  };

  const onTempOrderChange = (targetKey, originKey) => {
    setTempOrderChangeKeys({ targetKey, originKey });
  };

  const targetIndex =
    tempOrderChangeKeys.targetKey != null
      ? media.findIndex((m) => m.getKey() === tempOrderChangeKeys.targetKey)
      : null;
  const originIndex =
    tempOrderChangeKeys.originKey != null
      ? media.findIndex((m) => m.getKey() === tempOrderChangeKeys.originKey)
      : null;
  const quantityOfColumns = _getQuantityOfColumns(isMedium, isLarge);

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
          {allowedMediaTypes.map((option) => {
            const OptionIcon = MEDIA_OPTIONS_MAP[option].icon;
            return isNotMobile ? (
              <Button
                className={`MediaList__Option MediaList__Option__${
                  MEDIA_OPTIONS_MAP[option].classModifier || ''
                }`}
                key={option}
                startIcon={<OptionIcon />}
                onClick={handleDialogClickOpen(option)}
                disabled={media.length >= limit}
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
                disabled={media.length >= limit}
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
      <DnDContainer onMediaInput={onMediaInput} classNameModifier="List">
        {media && media.length ? (
          <ImageList
            className={`MediaList__List`}
            variant="quilted"
            cols={quantityOfColumns}
            rowHeight={121}
          >
            {media.map((mediaElement, index) => {
              const isOnSameLine =
                Math.floor(targetIndex / quantityOfColumns) ===
                Math.floor(index / quantityOfColumns);
              const targetElementOffset =
                targetIndex != null && isOnSameLine
                  ? index - targetIndex
                  : null;
              const originTargetElementsOffset =
                targetIndex != null && originIndex != null && isOnSameLine
                  ? targetIndex - originIndex
                  : null;
              return (
                <MediaListCard
                  key={mediaElement.getKey()}
                  colSize={MEDIA_OPTIONS_GRID_SIZE[mediaElement.mediaType] || 1}
                  rowSize={MEDIA_OPTIONS_GRID_SIZE[mediaElement.mediaType] || 1}
                  media={mediaElement}
                  targetElementOffset={targetElementOffset}
                  originTargetElementsOffset={originTargetElementsOffset}
                  onTempOrderChange={onTempOrderChange}
                  onModifyMediaOrder={onModifyMediaOrder}
                />
              );
            })}
          </ImageList>
        ) : (
          <Typography className="MediaList__EmptyMessage" align="center">
            Click above or drop image file or Youtube link
          </Typography>
        )}
      </DnDContainer>

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

MediaListDnD.defaultProps = {
  allowedMediaTypes: Object.values(MEDIA_OPTIONS),
  limit: 15,
};

MediaListDnD.propTypes = {
  allowedMediaTypes: PropTypes.array,
  limit: PropTypes.number,
};

export default MediaListDnD;
