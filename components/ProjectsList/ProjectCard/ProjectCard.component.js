import { Box, Paper, Typography } from '@mui/material';
import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { MEDIA_TYPES, resolveRoute, ROUTES } from '../../../constants';
import YoutubePreview from '../../common/Media/Previews/YoutubePreview';

const _allMedia = (project) => {
  return [
    ...project.sections.map((m) => m.mainMedia),
    ...project.sections.flatMap((m) => m.media || []),
  ];
};

const _findMainImageMedia = (project) => {
  const allMedia = _allMedia(project);
  return (
    allMedia.find((m) => m.mediaType === MEDIA_TYPES.IMAGE && m.thumbnailUrl) ||
    allMedia.find((m) => m.thumbnailUrl)
  );
};

const ProjectCard = ({ project }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentActiveVideo, setCurrentActiveVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleCardHover = (isHovered) => () => {
    setIsActive(isHovered);
    if (isHovered) {
      const allMedia = _allMedia(project);
      const activeVideoMedia = allMedia.find(
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
    const allMedia = _allMedia(project);
    const endedVideoIndex = allMedia.findIndex(
      (m) => m.resourceId === currentActiveVideo.resourceId
    );
    const activeVideoMedia = allMedia
      .slice(endedVideoIndex + 1)
      .find((m) => m.mediaType === MEDIA_TYPES.VIDEO_YOUTUBE);
    setCurrentActiveVideo(activeVideoMedia);
  };

  const mainImage = _findMainImageMedia(project)?.thumbnailUrl;

  const projectDetailsURL = resolveRoute(ROUTES.projects.view, project.id);

  return (
    <Link href={projectDetailsURL} passHref>
      <Paper
        className={classnames('ProjectCard ProjectCard__Container', {
          'ProjectCard__Container--no-images': !mainImage,
          'ProjectCard__Container--active': isActive,
        })}
        component="a"
        onMouseEnter={handleCardHover(true)}
        onMouseLeave={handleCardHover(false)}
      >
        <Box className="ProjectCard__DescriptionSection">
          <Typography
            className={classnames('ProjectCard__Title', {
              'ProjectCard__Title--withDescription': !!project.description,
            })}
            variant="subtitle1"
            color="primary"
          >
            {project.sections[0].title}
          </Typography>
          <Typography className="ProjectCard__Goal" variant="caption">
            {project.sections[0].description}
          </Typography>
        </Box>
        <img
          src={mainImage}
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
