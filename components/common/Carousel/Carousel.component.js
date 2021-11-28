import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Carousel = ({ images, aspectRatio }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onNextClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newActiveIndex =
      activeIndex + 1 >= images.length ? activeIndex : activeIndex + 1;

    setActiveIndex(newActiveIndex);
  };

  const onPrevClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newActiveIndex = activeIndex - 1 <= 0 ? 0 : activeIndex - 1;

    setActiveIndex(newActiveIndex);
  };

  const className = classnames(
    'Carousel Carousel__Container',
    `Carousel--aspect-ratio-${aspectRatio}`,
    {
      'Carousel--no-buttons': images.length <= 1,
      'Carousel--no-prev-button': activeIndex <= 0,
      'Carousel--no-next-button': activeIndex + 1 >= images.length,
    }
  );

  return (
    <div className={className}>
      <div className="Carousel__Prev">
        <IconButton onClick={onPrevClick} className="Carousel__Prev__Button" size="large">
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <div className="Carousel__Images">
        {images.map((image, i) => (
          <img
            key={i}
            src={image}
            className={classnames('Carousel__Images__Image', {
              'Carousel__Images__Image--active': i === activeIndex,
              'Carousel__Images__Image--prev': i === activeIndex - 1,
              'Carousel__Images__Image--next': i === activeIndex + 1,
            })}
          />
        ))}
      </div>
      <div className="Carousel__Next">
        <IconButton onClick={onNextClick} className="Carousel__Next__Button" size="large">
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

Carousel.defaultProps = {
  images: [],
  aspectRatio: '16x9',
};

Carousel.propTypes = {
  images: PropTypes.array,
  aspectRatio: PropTypes.string,
};

export default Carousel;
