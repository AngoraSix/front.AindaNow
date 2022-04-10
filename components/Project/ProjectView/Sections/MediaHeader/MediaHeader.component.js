import { Box, Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_TYPES } from '../../../../../constants';
import ProjectViewMediaCard from './ProjectViewMediaCard.component';

const QUANTITY_OF_CARDS = {
  MOBILE: 6,
  DESKTOP: 12,
};
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
  const isNotMobile = useMediaQuery('(min-width:600px)');
  const quantityOfCards = isNotMobile
    ? QUANTITY_OF_CARDS.DESKTOP
    : QUANTITY_OF_CARDS.MOBILE;

  const images = media
    .filter((m) => m.mediaType === MEDIA_TYPES.IMAGE)
    .map((m) => m.thumbnailUrl);

  return (
    <Box className="MediaHeader MediaHeader__Container">
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {new Array(quantityOfCards).fill('', 0, quantityOfCards).map((_, i) => {
          return (
            <Grid item key={i} xs={4} sm={2}>
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
