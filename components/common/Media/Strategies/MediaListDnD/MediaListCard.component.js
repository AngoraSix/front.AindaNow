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
import Image from "next/legacy/image";
import PropTypes from 'prop-types';
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DRAGGABLE_ITEMS, MEDIA_TYPES } from '../../../../../constants';

const MEDIA_TYPE_MAP = {
  [MEDIA_TYPES.IMAGE]: {
    icon: ImageIcon,
    classModifier: 'Image',
  },
  [MEDIA_TYPES.VIDEO_YOUTUBE]: {
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
  onRemoveMediaItem,
  handlePreviewDialogClickOpen,
}) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DRAGGABLE_ITEMS.MEDIA_CARD,
    item: { originKey: media.key },
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
      onTempOrderChange(media.key, item.originKey);
    },
    drop: async (item) => {
      await onModifyMediaOrder(media.key, item.originKey);
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
      <Image
        ref={preview}
        alt={media.key}
        src={media.thumbnailUrl}
        loading="lazy"
        fill={true}
      />
      <ImageListItemBar
        actionPosition="left"
        actionIcon={
          <Box>
            <IconButton
              edge="end"
              aria-label="preview"
              onClick={() => handlePreviewDialogClickOpen(media)}
            >
              <PreviewIcon sx={{ color: 'primary.light' }} />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={onRemoveMediaItem}
            >
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
  targetElementOffset: PropTypes.number,
  originTargetElementsOffset: PropTypes.number,
  onTempOrderChange: PropTypes.func.isRequired,
  onModifyMediaOrder: PropTypes.func.isRequired,
  handlePreviewDialogClickOpen: PropTypes.func.isRequired,
};

export default MediaListCard;
