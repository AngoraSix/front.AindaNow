import { Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const MediaSingleDnD = ({ media }) => {
  const singleMedia = media.length ? media[0] : media;

  return !!media && media.length ? (
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
    <Box className="MediaSingleDnD__DropZone__PreviewPlaceholder" />
  );
};

MediaSingleDnD.defaultProps = { media: [] };

MediaSingleDnD.propTypes = {
  media: PropTypes.array,
};

export default MediaSingleDnD;
