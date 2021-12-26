import { Button, IconButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ProjectCard from '../ProjectCard';
import NewIcon from '@mui/icons-material/AddCircleOutline';
import NewIconContained from '@mui/icons-material/AddCircle';

const ProjectsList = ({ total, projectsList, onNextPageClick, onSearch }) => {
  const [search, setSearch] = useState('');

  const onSearchChange = ({ target: { value } }) => {
    setSearch(value);

    onSearch(value);
  };

  return (
    <div className="ProjectsList ProjectsList__Container">
      <div className="ProjectsList__Toolbar">
        <div className="ProjectsList__Toolbar__Column Column__Large">
          <TextField
            label="Search"
            value={search}
            onChange={onSearchChange}
            fullWidth
          />
        </div>
        <div className="ProjectsList__Toolbar__Column">
          <Button
            color="primary"
            variant="contained"
            startIcon={<NewIcon />}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Create
          </Button>
          <IconButton
            aria-label="create"
            color="primary"
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <NewIconContained />
          </IconButton>
        </div>
      </div>

      <div className="ProjectsList__Content">
        <div className="ProjectsList__Grid">
          {projectsList.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

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
