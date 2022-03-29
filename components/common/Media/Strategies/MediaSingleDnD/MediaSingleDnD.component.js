import { Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const MediaSingleDnD = ({ media }) => {
  const singleMedia = media.length ? media[0] : media;

  return (
    <Box>
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
    </Box>
  );
};

MediaSingleDnD.defaultProps = { media: [] };

MediaSingleDnD.propTypes = {
  media: PropTypes.array,
  onAddMedia: PropTypes.func.isRequired,
};

export default MediaSingleDnD;
