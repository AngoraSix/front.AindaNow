import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Box, Grid, Skeleton, IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const ImagePreview = ({ media }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const isNotMobile = useMediaQuery('(min-width:600px)');

  const onZoomIn = () => {
    setIsZoomed(!isZoomed);
  };

  return media ? (
    <React.Fragment>
      <img
        onClick={!isNotMobile ? onZoomIn : undefined}
        className={`MediaPreview__Image ${
          isZoomed ? 'MediaPreview__Image__Zoomed' : ''
        }`}
        src={media?.thumbnailUrl}
      />
      {!isNotMobile && (
        <IconButton
          className={`MediaPreview__Image__ZoomIcon ${
            isZoomed ? 'ZoomedIn' : 'ZoomedOut'
          }`}
          onClick={!isNotMobile ? onZoomIn : undefined}
        >
          {isZoomed ? (
            <ZoomOutIcon fontSize="small" />
          ) : (
            <ZoomInIcon fontSize="small" />
          )}
        </IconButton>
      )}
    </React.Fragment>
  ) : (
    <Box className="MediaPreview__Image__Loading">
      <Grid container>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Box>
  );
};

ImagePreview.defaultProps = {};

ImagePreview.propTypes = {
  media: PropTypes.object,
};

export default ImagePreview;
