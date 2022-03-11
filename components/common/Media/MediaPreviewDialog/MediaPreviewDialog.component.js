import { Dialog, DialogContent, Zoom } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_TYPES } from '../../../../constants';
import ImagePreview from './Types/ImagePreview';
import YoutubePreview from './Types/YoutubePreview';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in={true} ref={ref} {...props} />;
});

const MEDIA_PREVIEW_TYPES_MAP = {
  [MEDIA_TYPES.IMAGE]: ImagePreview,
  [MEDIA_TYPES.VIDEO_YOUTUBE]: YoutubePreview,
};

const MediaPreviewDialog = ({ mediaType, open, handleDialogClose, media }) => {
  const PreviewComponent =
    MEDIA_PREVIEW_TYPES_MAP[mediaType] ||
    MEDIA_PREVIEW_TYPES_MAP[MEDIA_TYPES.IMAGE];

  return (
    <Dialog
      className="MediaPreview__Dialog__Container"
      open={!!open && !!mediaType}
      onClose={handleDialogClose}
      maxWidth="xl"
      TransitionComponent={Transition}
    >
      <DialogContent>
        <PreviewComponent media={media} />
      </DialogContent>
    </Dialog>
  );
};

MediaPreviewDialog.defaultProps = {
  open: false,
  mediaType: MEDIA_TYPES.IMAGE,
};

MediaPreviewDialog.propTypes = {
  open: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  media: PropTypes.object,
  mediaType: PropTypes.string,
};

export default MediaPreviewDialog;