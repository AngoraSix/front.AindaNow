import { Box, Divider, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React from 'react';

const PresentationSectionPreview = ({ presentationSection, isNotMobile }) => {
  const isMedium = useMediaQuery('(min-width:900px)');
  const isLarge = useMediaQuery('(min-width:1200px)');

  const allMedia = [
    presentationSection.mainMedia,
    ...presentationSection.media,
  ];
  const maxQtyOfCols = isNotMobile ? (isMedium ? (isLarge ? 10 : 6) : 4) : 2;
  const qtyOfCols =
    allMedia.length < maxQtyOfCols ? allMedia.length : maxQtyOfCols;
  return (
    <Box className="PresentationSectionPreview PresentationSectionPreview__Container">
      <Divider className="PresentationSectionPreview__Title__Container">
        <Typography
          color="primary"
          className="PresentationSectionPreview__Title__Text"
        >
          {presentationSection.title}
        </Typography>
      </Divider>
      <Box className="PresentationSectionPreview__Data">
        <Box className="PresentationSectionPreview__Media__Container">
          <img
            className="PresentationSectionPreview__Media__Image"
            src={presentationSection.mainMedia.thumbnailUrl}
            loading="lazy"
          />
        </Box>
        <Box className="PresentationSectionPreview__Description__Container">
          <Typography className="PresentationSectionPreview__Description__Text">
            {presentationSection.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

PresentationSectionPreview.defaultProps = {};

PresentationSectionPreview.propTypes = {
  presentationSection: PropTypes.object,
};

export default PresentationSectionPreview;
