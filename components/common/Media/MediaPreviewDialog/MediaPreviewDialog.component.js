import { Dialog, DialogContent, Zoom } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_TYPES } from '../../../../constants';
import MediaPreview from '../Previews';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom in={true} ref={ref} {...props} />;
});

const MediaPreviewDialog = ({ mediaType, open, handleDialogClose, media }) => {
  return (
    <Dialog
      className="MediaPreview__Dialog__Container"
      open={!!open && !!mediaType}
      onClose={handleDialogClose}
      maxWidth="xl"
      TransitionComponent={Transition}
    >
      <DialogContent>
        {open && media && (
          <MediaPreview
            mediaType={mediaType || MEDIA_TYPES.IMAGE}
            media={media}
            allowsZoomingIn={true}
          />
        )}
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
