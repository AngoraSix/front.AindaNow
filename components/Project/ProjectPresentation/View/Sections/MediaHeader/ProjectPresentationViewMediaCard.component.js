import { Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const OVERLAYS = ['Transparent', 'Light', 'Regular', 'Dark'];

const _getRandomIndexForArray = (array) => {
  return Math.floor(Math.random() * array.length);
};

const ProjectPresentationViewMediaCard = ({ imagesList, interval }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [activeOverlayIndex, setActiveOverlayIndex] = useState(1);
  const [cardInterval, setCardInterval] = useState(5000);

  useEffect(() => {
    const intervalObject = setInterval(() => {
      setActiveMediaIndex(_getRandomIndexForArray(imagesList));
      setActiveOverlayIndex(_getRandomIndexForArray(OVERLAYS));
    }, interval);
    setActiveMediaIndex(_getRandomIndexForArray(imagesList));
    setActiveOverlayIndex(_getRandomIndexForArray(OVERLAYS));
    setCardInterval(interval);

    // clean up interval on unmount
    return () => {
      clearInterval(intervalObject);
    };
  }, []);

  return (
    <Paper
      className={`MediaCard MediaCard__Container ${
        activeOverlayIndex === 0 ? 'Transparent' : ''
      }`}
      style={{ transition: `opacity ${cardInterval / 4}ms` }}
      elevation={0}
    >
      <Box
        className={`MediaCard__Overlay ${OVERLAYS[activeOverlayIndex]}
        `}
        style={{
          animationDuration: `${cardInterval}ms`,
        }}
      ></Box>
      <img className={'MediaCard__Image'} src={imagesList[activeMediaIndex]} />
    </Paper>
  );
};

ProjectPresentationViewMediaCard.defaultProps = {
  imagesList: [],
  interval: 5000, // every five second
};

ProjectPresentationViewMediaCard.propTypes = {
  imagesList: PropTypes.arrayOf(PropTypes.string),
  interval: PropTypes.number,
};
export default ProjectPresentationViewMediaCard;