import { Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import DnDContainer from '../../DnDContainer.component';

const MediaSingleDnD = ({ media, onAddMedia }) => {
  const singleMedia = Array.isArray(media) ? media[0] : media;

  return (
    <Box>
      <DnDContainer onMediaInput={onAddMedia} classNameModifier="Single">
        {!!media && media.length ? (
          <Paper className="MediaSingleDnD__DropZone__Preview__Container">
            <Box
              key={singleMedia.key}
              style={{
                backgroundImage: `url(${singleMedia.thumbnailUrl}) `,
              }}
              className="MediaSingleDnD__DropZone__Preview"
            />
          </Paper>
        ) : (
          <div className="MediaSingleDnD__DropZone__PreviewPlaceholder" />
        )}
      </DnDContainer>
    </Box>
  );
};

MediaSingleDnD.defaultProps = { media: [] };

MediaSingleDnD.propTypes = {
  media: PropTypes.array,
  onAddMedia: PropTypes.func.isRequired,
};

export default MediaSingleDnD;
