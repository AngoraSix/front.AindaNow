import { Box, ImageList, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { MEDIA_TYPES } from '../../../../../constants';
import MediaPreviewDialog from '../../MediaPreviewDialog';
import MediaListCard from './MediaListCard.component';

const MEDIA_OPTIONS_GRID_SIZE = {
  [MEDIA_TYPES.IMAGE]: 1,
  [MEDIA_TYPES.VIDEO_YOUTUBE]: 1,
};

const _getQuantityOfColumns = (isMedium, isLarge) =>
  isLarge ? 6 : isMedium ? 4 : 2;

const MediaListDnD = ({ media, onModifyMediaOrder, onRemoveMediaItem }) => {
  const [openedPreviewDialogMedia, setOpenedPreviewDialogMedia] =
    useState(null);
  const [tempOrderChangeKeys, setTempOrderChangeKeys] = useState({
    targetKey: null,
    originKey: null,
  });
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.up('md'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

  const handlePreviewDialogClickOpen = (mediaItem) => {
    setOpenedPreviewDialogMedia(mediaItem);
  };

  const handleDialogClose = () => {
    setOpenedPreviewDialogMedia(null);
  };

  const onRemoveMedia = (index) => () => {
    onRemoveMediaItem(index);
  };

  const onTempOrderChange = (targetKey, originKey) => {
    setTempOrderChangeKeys({ targetKey, originKey });
  };

  const targetIndex =
    tempOrderChangeKeys.targetKey != null
      ? media.findIndex((m) => m.key === tempOrderChangeKeys.targetKey)
      : null;
  const originIndex =
    tempOrderChangeKeys.originKey != null
      ? media.findIndex((m) => m.key === tempOrderChangeKeys.originKey)
      : null;
  const quantityOfColumns = _getQuantityOfColumns(isMedium, isLarge);

  return (
    <Box className="MediaList__Container">
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
              targetIndex != null && isOnSameLine ? index - targetIndex : null;
            const originTargetElementsOffset =
              targetIndex != null && originIndex != null && isOnSameLine
                ? targetIndex - originIndex
                : null;
            return (
              <MediaListCard
                key={mediaElement.key || mediaElement.resourceId || index}
                colSize={MEDIA_OPTIONS_GRID_SIZE[mediaElement.mediaType] || 1}
                rowSize={MEDIA_OPTIONS_GRID_SIZE[mediaElement.mediaType] || 1}
                media={mediaElement}
                targetElementOffset={targetElementOffset}
                originTargetElementsOffset={originTargetElementsOffset}
                onTempOrderChange={onTempOrderChange}
                onModifyMediaOrder={onModifyMediaOrder}
                onRemoveMediaItem={onRemoveMedia(index)}
                handlePreviewDialogClickOpen={handlePreviewDialogClickOpen}
              />
            );
          })}
        </ImageList>
      ) : (
        <Typography className="MediaList__EmptyMessage" align="center">
          Click above or drop image file or Youtube link
        </Typography>
      )}
      <MediaPreviewDialog
        open={!!openedPreviewDialogMedia}
        media={openedPreviewDialogMedia}
        handleDialogClose={handleDialogClose}
        mediaType={openedPreviewDialogMedia?.mediaType}
      />
    </Box>
  );
};

MediaListDnD.defaultProps = {
  media: [],
};

MediaListDnD.propTypes = {
  media: PropTypes.array,
  onModifyMediaOrder: PropTypes.func.isRequired,
  onRemoveMediaItem: PropTypes.func.isRequired,
};

export default MediaListDnD;
