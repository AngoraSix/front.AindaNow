import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from '@mui/icons-material/FilePresent';
import ImageIcon from '@mui/icons-material/Image';
import PreviewIcon from '@mui/icons-material/Preview';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
  Box,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DRAGGABLE_ITEMS, MEDIA_OPTIONS } from '../../../../../constants';

const MEDIA_TYPE_MAP = {
  [MEDIA_OPTIONS.IMAGE]: {
    icon: ImageIcon,
    classModifier: 'Image',
  },
  [MEDIA_OPTIONS.VIDEO_YOUTUBE]: {
    icon: YouTubeIcon,
    classModifier: 'Youtube',
  },
};

const _mapOffsetToClassModifier = (offset, originTargetOffset) => {
  if (offset == null) return 'Regular';
  if (offset === 0 && originTargetOffset === 0) return 'Current';
  const isMovingForward = originTargetOffset != null && originTargetOffset > 0;
  if (offset === 0) return isMovingForward ? 'JustBefore' : 'JustAfter';
  if (offset < 0) return 'Before';
  if (offset > 0) return 'After';
  return 'Regular';
};

/* We would separate visual and placement(draggable) logic, but ImageListItem doesn't work well with inner React.Framgent */
const MediaListCard = ({
  media,
  colSize,
  rowSize,
  targetElementOffset,
  originTargetElementsOffset,
  onTempOrderChange,
  onModifyMediaOrder,
}) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DRAGGABLE_ITEMS.MEDIA_CARD,
    item: { originKey: media.getKey() },
    end: () => {
      onTempOrderChange(null);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: DRAGGABLE_ITEMS.MEDIA_CARD,
    hover: (item) => {
      onTempOrderChange(media.getKey(), item.originKey);
    },
    drop: async (item) => {
      await onModifyMediaOrder(media.getKey(), item.originKey);
    },
    collect: () => ({}),
  }));

  const MediaIcon = MEDIA_TYPE_MAP[media.mediaType]?.icon || FileIcon;

  return (
    <ImageListItem
      className={`MediaListCard ${
        isDragging ? 'MediaListCard__Placement__Dragging' : ''
      }
      MediaListCard__Placement__${_mapOffsetToClassModifier(
        targetElementOffset,
        originTargetElementsOffset
      )}
      `}
      cols={colSize}
      rows={rowSize}
      ref={(node) => drag(drop(node))}
    >
      <MediaIcon
        className={`MediaListCard__MediaIcon MediaListCard__MediaIcon__${
          MEDIA_TYPE_MAP[media.mediaType]?.classModifier || 'Default'
        }`}
      />
      <img ref={preview} src={media.thumbnailUrl} loading="lazy" />
      <ImageListItemBar
        actionPosition="left"
        actionIcon={
          <Box>
            <IconButton edge="end" aria-label="preview">
              <PreviewIcon sx={{ color: 'primary.light' }} />
            </IconButton>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon sx={{ color: 'primary.light' }} />
            </IconButton>
          </Box>
        }
      />
    </ImageListItem>
  );
};

MediaListCard.defaultProps = { colSize: 1, rowSize: 1 };

MediaListCard.propTypes = {
  media: PropTypes.object.isRequired,
  colSize: PropTypes.number,
  rowSize: PropTypes.number,
};

export default MediaListCard;
