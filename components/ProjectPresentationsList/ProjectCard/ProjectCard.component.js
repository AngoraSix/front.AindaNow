import { Box, Paper, Typography } from '@mui/material';
import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { MEDIA_TYPES, ROUTES } from '../../../constants';
import { resolveRoute } from '../../../utils/api/apiHelper';
import YoutubePreview from '../../common/Media/Previews/YoutubePreview';

const _allMedia = (projectPresentation) => {
  return [
    ...(projectPresentation.sections?.map((m) => m.mainMedia) || []),
    ...(projectPresentation.sections?.flatMap((m) => m.media || []) || []),
  ];
};

const _findMainImageMedia = (projectPresentation) => {
  const allMedia = _allMedia(projectPresentation);
  return (
    allMedia.find((m) => m.mediaType === MEDIA_TYPES.IMAGE && m.thumbnailUrl) ||
    allMedia.find((m) => m.thumbnailUrl)
  );
};

const ProjectCard = ({ projectPresentation }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentActiveVideo, setCurrentActiveVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const handleCardHover = (isHovered) => () => {
    setIsActive(isHovered);
    if (isHovered) {
      const allMedia = _allMedia(projectPresentation);
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
    // with this check we should avoid the 'Can't perform a React state update on an unmounted component' error message
    if (mounted.current === true) {
      setIsVideoPlaying(true);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    const allMedia = _allMedia(projectPresentation);
    const endedVideoIndex = allMedia.findIndex(
      (m) => m.resourceId === currentActiveVideo.resourceId
    );
    const activeVideoMedia = allMedia
      .slice(endedVideoIndex + 1)
      .find((m) => m.mediaType === MEDIA_TYPES.VIDEO_YOUTUBE);
    setCurrentActiveVideo(activeVideoMedia);
  };

  const mainImage = _findMainImageMedia(projectPresentation)?.thumbnailUrl;

  const viewURL = resolveRoute(
    ROUTES.projects.presentations.view,
    projectPresentation.projectId,
    projectPresentation.id
  );

  return (
    <Link href={viewURL} passHref>
      <Paper
        className={classnames('ProjectCard ProjectCard__Container', {
          'ProjectCard__Container--no-images': !mainImage,
          'ProjectCard__Container--active': isActive,
        })}
        onMouseEnter={handleCardHover(true)}
        onMouseLeave={handleCardHover(false)}
      >
        <Box className="ProjectCard__DescriptionSection">
          <Typography
            className={classnames('ProjectCard__DescriptionSection__Title', {
              'ProjectCard__DescriptionSection__Title--withDescription':
                !!projectPresentation.description,
            })}
            variant="subtitle1"
            color="primary"
          >
            {projectPresentation.project.name}
          </Typography>
        </Box>
        <Image
          src={mainImage}
          alt={`Main image for project ${projectPresentation.project.name}`}
          className={classnames('ProjectCard__Image', {
            'ProjectCard__Image--hidden': !!isVideoPlaying,
          })}
          fill
          placeholder="blur"
          blurDataURL={mainImage}
          sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  25vw"
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
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectCard;
