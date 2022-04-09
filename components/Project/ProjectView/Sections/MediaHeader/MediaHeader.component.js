import { Box, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_TYPES } from '../../../../../constants';
import ProjectViewMediaCard from './ProjectViewMediaCard.component';

const QUANTITY_OF_CARDS = 12;
const INTERVAL_RANGE = {
  MIN: 12500,
  MAX: 27500,
};

const _getRandomInterval = () => {
  const interval = Math.round(
    INTERVAL_RANGE.MIN +
      Math.random() * (INTERVAL_RANGE.MAX - INTERVAL_RANGE.MIN)
  );
  return interval;
};

const MediaHeader = ({ media }) => {
  const images = media
    .filter((m) => m.mediaType === MEDIA_TYPES.IMAGE)
    .map((m) => m.thumbnailUrl);

  return (
    <Box className="MediaHeader MediaHeader__Container">
      <Grid container spacing={2}>
        {new Array(QUANTITY_OF_CARDS)
          .fill('', 0, QUANTITY_OF_CARDS)
          .map((_, i) => {
            return (
              <Grid item key={i} xs={2}>
                <ProjectViewMediaCard
                  imagesList={images}
                  interval={_getRandomInterval()}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

MediaHeader.defaultProps = {
  media: [],
};

MediaHeader.propTypes = {
  media: PropTypes.array,
};

export default MediaHeader;
