import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React from 'react';
import { MEDIA_TYPES } from '../../../../../../constants';
import ProjectPresentationViewMediaCard from './ProjectPresentationViewMediaCard.component';

const QUANTITY_OF_CARDS = {
  XS: 6,
  SMALL: 8,
  MEDIUM: 12,
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

const _getQuantityOfCards = (isSmall, isMedium) =>
  isMedium
    ? QUANTITY_OF_CARDS.MEDIUM
    : isSmall
    ? QUANTITY_OF_CARDS.SMALL
    : QUANTITY_OF_CARDS.XS;

const MediaHeader = ({ media }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.up('md'));
  const quantityOfCards = _getQuantityOfCards(isSmall, isMedium);
  isSmall ? QUANTITY_OF_CARDS.MOBILE : QUANTITY_OF_CARDS.DESKTOP;

  const images = media
    .filter((m) => m.mediaType === MEDIA_TYPES.IMAGE)
    .map((m) => m.thumbnailUrl);

  return (
    <Box className="MediaHeader MediaHeader__Container">
      <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
        {new Array(quantityOfCards).fill('', 0, quantityOfCards).map((_, i) => {
          return (
            <Grid item key={i} xs={4} sm={3} md={2}>
              <ProjectPresentationViewMediaCard
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
