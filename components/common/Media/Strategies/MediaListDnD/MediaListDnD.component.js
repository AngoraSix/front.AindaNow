import { Box, ImageList, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { MEDIA_TYPES } from '../../../../../constants';
import DnDContainer from '../../DnDContainer.component';
import MediaPreviewDialog from '../../MediaPreviewDialog';
import MediaListCard from './MediaListCard.component';

const MEDIA_OPTIONS_GRID_SIZE = {
  [MEDIA_TYPES.IMAGE]: 1,
  [MEDIA_TYPES.VIDEO_YOUTUBE]: 1,
};

const _getQuantityOfColumns = (isMedium, isLarge) =>
  isLarge ? 6 : isMedium ? 4 : 2;

const MediaListDnD = ({
  limit,
  media,
  onAddMedia,
  onModifyMediaOrder,
  onRemoveMediaItem,
}) => {
  const [openedPreviewDialogMedia, setOpenedPreviewDialogMedia] =
    useState(null);
  const [tempOrderChangeKeys, setTempOrderChangeKeys] = useState({
    targetKey: null,
    originKey: null,
  });
  const isMedium = useMediaQuery('(min-width:900px)');
  const isLarge = useMediaQuery('(min-width:1200px)');

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
      <DnDContainer
        onMediaInput={onAddMedia}
        classNameModifier="List"
        disabled={media.length >= limit}
      >
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
                  key={mediaElement.key}
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
      </DnDContainer>

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
  limit: 15,
  media: [],
};

MediaListDnD.propTypes = {
  limit: PropTypes.number,
  media: PropTypes.array,
  onAddMedia: PropTypes.func.isRequired,
  onModifyMediaOrder: PropTypes.func.isRequired,
  onRemoveMediaItem: PropTypes.func.isRequired,
};

export default MediaListDnD;
