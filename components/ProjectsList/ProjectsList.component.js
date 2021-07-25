import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FieldMaker from 'react-mui-fieldmaker';
import ProjectCard from '../ProjectCard';

const ProjectsList = ({ total, projectsList, onNextPageClick, onSearch }) => {
  const [search, setSearch] = useState('');

  const onSearchChange = ({ target: { value } }) => {
    setSearch(value);

    onSearch(value);
  };

  return (
    <div className="ProjectsList ProjectsList__Container">
      <div className="ProjectsList__Toolbar">
        <div className="ProjectsList__Toolbar__Column">
          <div>
            Mostrando {projectsList.length} de {total}
          </div>
        </div>
        <div className="ProjectsList__Toolbar__Column" />
        <div className="ProjectsList__Toolbar__Column">
          <FieldMaker
            label="Buscar"
            value={search}
            type="text"
            onChange={onSearchChange}
          />
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
