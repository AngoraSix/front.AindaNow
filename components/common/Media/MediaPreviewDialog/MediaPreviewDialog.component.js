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

const MediaPreviewDialog = ({ mediaType, open, handleDialogClose, media }) => {
  const PreviewComponent =
    MEDIA_PREVIEW_TYPES_MAP[mediaType] ||
    MEDIA_PREVIEW_TYPES_MAP[MEDIA_OPTIONS.IMAGE];

  return (
    <Dialog
      className="MediaPreview__Dialog__Container"
      open={!!open && !!mediaType}
      onClose={handleDialogClose}
      maxWidth="xl"
    >
      <DialogContent>
        <PreviewComponent media={media} />
      </DialogContent>
    </Dialog>
  );
};

MediaPreviewDialog.defaultProps = {
  open: false,
  mediaType: MEDIA_OPTIONS.IMAGE,
};

MediaPreviewDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  media: PropTypes.object,
  mediaType: PropTypes.string,
};

export default MediaPreviewDialog;
