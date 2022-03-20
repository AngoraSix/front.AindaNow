import { Box, Paper, Typography } from '@mui/material';
import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { resolveRoute, ROUTES, MEDIA_TYPES } from '../../../constants';
import YoutubePreview from '../../common/Media/Previews/YoutubePreview';

const ProjectCard = ({ project }) => {
  const [isActive, setIsActive] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleCardHover = (isHovered) => () => {
    setIsActive(isHovered);
    if (!isHovered) {
      setIsVideoPlaying(false);
    }
  };

  const handleVideoIsReady = () => {
    setIsVideoPlaying(true);
  };

  const images =
    project.media?.filter((m) => m.thumbnailUrl).map((m) => m.thumbnailUrl) ||
    [];

  const projectDetailsURL = resolveRoute(ROUTES.projects.view, project.id);
  const activeVideoMedia = isActive
    ? project.media?.filter(
        (m) => m.mediaType === MEDIA_TYPES.VIDEO_YOUTUBE
      )?.[0]
    : null;

  return (
    <Link href={projectDetailsURL} passHref>
      <Paper
        className={classnames('ProjectCard ProjectCard__Container', {
          'ProjectCard__Container--no-images': !images.length,
          'ProjectCard__Container--active': isActive,
        })}
        component="a"
        onMouseEnter={handleCardHover(true)}
        onMouseLeave={handleCardHover(false)}
      >
        <Box className="ProjectCard__DescriptionSection">
          <Typography
            className={classnames('ProjectCard__Title', {
              'ProjectCard__Title--withDescription': !!project.objective,
            })}
            variant="subtitle1"
            color="primary"
          >
            {project.title}
          </Typography>
          <Typography className="ProjectCard__Goal" variant="caption">
            {project.objective}
          </Typography>
        </Box>
        <img
          src={images[0]}
          className={classnames('ProjectCard__Image', {
            'ProjectCard__Image--hidden': !!isVideoPlaying,
          })}
        />
        {activeVideoMedia && (
          <YoutubePreview
            media={activeVideoMedia}
            autoplay={true}
            iframeClassname="ProjectCard__VideoSection__Iframe"
            containerClassname={classnames('ProjectCard__VideoSection', {
              'ProjectCard__VideoSection--active': !!isVideoPlaying,
            })}
            onVideoReady={handleVideoIsReady}
          />
        )}
      </Paper>
    </Link>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
