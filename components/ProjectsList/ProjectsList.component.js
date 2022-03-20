import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, IconButton, TextField } from '@mui/material';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import NewIcon from '@mui/icons-material/AddCircleOutline';
import NewIconContained from '@mui/icons-material/AddCircle';
import { ROUTES } from '../../constants';

const ProjectsList = ({ total, projectsList, onNextPageClick, onSearch }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="ProjectsList ProjectsList__Container">
      <div className="ProjectsList__Toolbar">
        <div className="ProjectsList__Toolbar__Column Column__Large">
          <TextField
            className="ProjectsList__Toolbar__Input"
            label="Search"
            value={search}
            onChange={({ target: value }) => onSearchChange(value)}
            fullWidth
          />
        </div>
        <div className="ProjectsList__Toolbar__Column">
          <Link href={ROUTES.projects.new}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<NewIcon />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Create
            </Button>
          </Link>
          <Link href={ROUTES.projects.new}>
            <IconButton
              aria-label="create"
              color="primary"
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              <NewIconContained />
            </IconButton>
          </Link>
        </div>
      </div>

      <div className="ProjectsList__Content">
        <Grid container spacing={2}>
          {projectsList.map((project) => (
            <Grid key={project.id} item xs={12} sm={6} md={4} lg={3}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        {total > projectsList.length && (
          <div className="ProjectsList__LoadMore">
            <Button
              variant="outlined"
              color="primary"
              onClick={onNextPageClick}
            >
              Mostrar más
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

ProjectsList.defaultProps = {
  total: 0,
  projects: [],
};

ProjectsList.propTypes = {
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onNextPageClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  projects: PropTypes.array,
};

export default ProjectsList;
