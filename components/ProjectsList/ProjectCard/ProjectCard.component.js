import { Box, Paper, Typography } from '@mui/material';
import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { resolveRoute, ROUTES, MEDIA_TYPES } from '../../../constants';
import YoutubePreview from '../../common/Media/Previews/YoutubePreview';

const ProjectCard = ({ project }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentActiveVideo, setCurrentActiveVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleCardHover = (isHovered) => () => {
    setIsActive(isHovered);
    if (isHovered) {
      const activeVideoMedia = project.media?.find(
        (m) => m.mediaType === MEDIA_TYPES.VIDEO_YOUTUBE
      );
      setCurrentActiveVideo(activeVideoMedia);
    } else {
      setIsVideoPlaying(false);
      setCurrentActiveVideo(null);
    }
  };

  const handleVideoIsReady = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    const endedVideoIndex = project.media.findIndex(
      (m) => m.resourceId === currentActiveVideo.resourceId
    );
    const activeVideoMedia = project.media
      .slice(endedVideoIndex + 1)
      .find((m) => m.mediaType === MEDIA_TYPES.VIDEO_YOUTUBE);
    setCurrentActiveVideo(activeVideoMedia);
  };

  let imageMedia = project.media?.filter(
    (m) => m.mediaType === MEDIA_TYPES.IMAGE && m.thumbnailUrl
  );
  if (!imageMedia?.length)
    imageMedia = project.media?.filter((m) => m.thumbnailUrl) || [];

  const images = imageMedia.map((m) => m.thumbnailUrl);

  const projectDetailsURL = resolveRoute(ROUTES.projects.view, project.id);

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
        {currentActiveVideo && (
          <YoutubePreview
            media={currentActiveVideo}
            autoplay={true}
            iframeClassname="ProjectCard__VideoSection__Iframe"
            containerClassname={classnames('ProjectCard__VideoSection', {
              'ProjectCard__VideoSection--active': !!isVideoPlaying,
            })}
            onVideoReady={handleVideoIsReady}
            onVideoEnd={handleVideoEnded}
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
