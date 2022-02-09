import { Dialog, DialogContent } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_OPTIONS } from '../../../../constants';
import ImagePreview from './Types/ImagePreview';
import YoutubePreview from './Types/YoutubePreview';

const MEDIA_PREVIEW_TYPES_MAP = {
  [MEDIA_OPTIONS.IMAGE]: ImagePreview,
  [MEDIA_OPTIONS.VIDEO_YOUTUBE]: YoutubePreview,
};

const MediaPreviewDialogContainer = ({
  mediaType,
  open,
  handleDialogClose,
  media,
}) => {
  const PreviewComponent =
    MEDIA_PREVIEW_TYPES_MAP[mediaType] ||
    MEDIA_PREVIEW_TYPES_MAP[MEDIA_OPTIONS.IMAGE];

  return (
    <Dialog
      open={!!open && !!mediaType}
      onClose={handleDialogClose}
      maxWidth="xl"
      fullWidth
    >
      <DialogContent>
        <PreviewComponent media={media} />
      </DialogContent>
    </Dialog>
  );
};

MediaPreviewDialogContainer.defaultProps = {
  open: false,
  mediaType: MEDIA_OPTIONS.IMAGE,
};

MediaPreviewDialogContainer.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  media: PropTypes.object.isRequired,
  mediaType: PropTypes.string,
};

export default MediaPreviewDialogContainer;
