import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { Box, Grid, IconButton, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const ImagePreview = ({
  media,
  allowsZoomingIn,
  imageProps,
  fullWidthAvailable,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onZoomIn = () => {
    if (allowsZoomingIn) {
      setIsZoomed(!isZoomed);
    }
  };

  return media ? (
    <Box
      className={`MediaPreview__Image__Container ${
        fullWidthAvailable ? 'FullWidthAvailable' : ''
      } ${isZoomed ? 'Zoomed' : ''}`}
    >
      <Image
        onClick={isMobile ? onZoomIn : undefined}
        className="MediaPreview__Image"
        alt={media?.key || 'Image Preview'}
        src={media?.thumbnailUrl}
        placeholder="blur"
        blurDataURL={media?.thumbnailUrl}
        fill
        sizes="90vw"
        {...imageProps}
      />
      {allowsZoomingIn && isMobile && (
        <IconButton
          className={`MediaPreview__Image__ZoomIcon ${
            isZoomed ? 'ZoomedIn' : 'ZoomedOut'
          }`}
          onClick={isMobile ? onZoomIn : undefined}
        >
          {isZoomed ? (
            <ZoomOutIcon fontSize="small" />
          ) : (
            <ZoomInIcon fontSize="small" />
          )}
        </IconButton>
      )}
    </Box>
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

ImagePreview.defaultProps = {
  allowsZoomingIn: false,
  fullWidthAvailable: false,
  imageProps: {},
};

ImagePreview.propTypes = {
  media: PropTypes.object.isRequired,
  allowsZoomingIn: PropTypes.bool,
  fullWidthAvailable: PropTypes.bool,
  imageProps: PropTypes.object,
};

export default ImagePreview;
