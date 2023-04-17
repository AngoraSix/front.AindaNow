import { Box, Divider, Typography } from '@mui/material';
import Image from "next/image";
import PropTypes from 'prop-types';
import React from 'react';

const PresentationSectionPreview = ({ presentationSection }) => {
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
          <Box className="Commons__NextImageContainer">
            <Image
              alt={presentationSection.mainMedia.key}
              className="PresentationSectionPreview__Media__Image"
              src={presentationSection.mainMedia.thumbnailUrl}
              loading="lazy"
              fill={true}
              fill
              sizes="100vw" />
          </Box>
        </Box>
        {presentationSection.description && (
          <Box className="PresentationSectionPreview__Description__Container">
            <Typography className="PresentationSectionPreview__Description__Text">
              {presentationSection.description}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

PresentationSectionPreview.defaultProps = {};

PresentationSectionPreview.propTypes = {
  presentationSection: PropTypes.object,
};

export default PresentationSectionPreview;
