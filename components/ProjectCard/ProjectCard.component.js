import { Paper, Typography } from '@material-ui/core';
import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const ProjectCard = ({ project }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images =
    project.media.filter((m) => m.type === 'image').map((m) => m.url) || [];

  const className = classnames('ProjectCard ProjectCard__Container', {
    'ProjectCard--no-images': !images.length,
  });

  let projectDetailsURL = `/projects/${project.id}`;

  return (
    <Link href={projectDetailsURL} passHref>
      <Paper className={className} component="a">
        <div className="ProjectCard__Images">
          <div className="ProjectCard__Image__Container">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                className={classnames('ProjectCard__Image', {
                  'ProjectCard__Image--active': activeImageIndex === i,
                  'ProjectCard__Image--prev': activeImageIndex - 1 === i,
                  'ProjectCard__Image--next': activeImageIndex + 1 === i,
                })}
              />
            ))}
          </div>
        </div>
        <div className="ProjectCard__Data">
          <div className="ProjectCard__Data__Title">
            <Typography variant="subtitle1" color="primary">
              {project.title}
            </Typography>
          </div>
          <div className="ProjectCard__Data__Row">
            <div className="ProjectCard__Data__Description">
              <Typography
                variant="caption"
                component="label"
                className="ProjectCard__Label"
              >
                Goals
              </Typography>
              <div className="ProjectCard__Data__Value">
                {project.objective}
              </div>
            </div>
          </div>
        </div>
        <div className="ProjectCard__Actions"></div>
      </Paper>
    </Link>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectCard;
