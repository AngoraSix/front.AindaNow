import { Box, Paper, Typography } from '@mui/material';
import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { resolveRoute, ROUTES } from '../../../constants';

const ProjectCard = ({ project }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images =
    project.media?.filter((m) => m.thumbnailUrl).map((m) => m.thumbnailUrl) ||
    [];

  const className = classnames('ProjectCard ProjectCard__Container', {
    'ProjectCard--no-images': !images.length,
  });

  let projectDetailsURL = resolveRoute(ROUTES.projects.view, project.id);

  return (
    <Link href={projectDetailsURL} passHref>
      <Paper className={className} component="a">
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
        {/* {images.map((src, i) => ( */}
        <img
          // key={i}
          src={images[0]}
          className={classnames('ProjectCard__Image', {
            // 'ProjectCard__Image--active': activeImageIndex === i,
            // 'ProjectCard__Image--prev': activeImageIndex - 1 === i,
            // 'ProjectCard__Image--next': activeImageIndex + 1 === i,
          })}
        />
        {/* ))} */}
      </Paper>
    </Link>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
