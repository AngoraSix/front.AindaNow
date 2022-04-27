import {
  Box,
  Divider,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const PresentationSectionPreview = ({ presentationSection, isNotMobile }) => {
  const allMedia = [
    presentationSection.mainMedia,
    ...presentationSection.media,
  ];
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
      <ImageList
        className="PresentationSectionPreview__Media__Container"
        cols={isNotMobile ? (allMedia.length < 10 ? allMedia.length : 10) : 2}
        rowHeight={100}
      >
        {allMedia.map((m) => (
          <ImageListItem key={m.resourceId}>
            <img src={m.thumbnailUrl} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
      <Box className="PresentationSectionPreview__Description__Container">
        <Typography className="PresentationSectionPreview__Description__Text">
          {presentationSection.description}
        </Typography>
      </Box>
    </Box>
  );
};

PresentationSectionPreview.defaultProps = {};

PresentationSectionPreview.propTypes = {
  presentationSection: PropTypes.object,
};

export default PresentationSectionPreview;
