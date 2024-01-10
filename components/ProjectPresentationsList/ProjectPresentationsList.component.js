import SearchIcon from '@mui/icons-material/Search';
import NewIconContained from '@mui/icons-material/AddCircle';
import NewIcon from '@mui/icons-material/AddCircleOutline';
import {
  FormControl,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ROUTES } from '../../constants';
import ProjectCard from './ProjectCard';

const ProjectPresentationsList = ({
  total,
  projectPresentationsList,
  onNextPageClick,
  onSearch,
}) => {
  const { t } = useTranslation('project-presentations.list');
  const [search, setSearch] = useState('');

  return (
    <Box className="ProjectPresentationsList ProjectPresentationsList__Container">
      <Box className="ProjectPresentationsList__Toolbar">
        <Box className="ProjectPresentationsList__Toolbar__Column Column__Large">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(search);
            }}
          >
            <TextField
              className="ProjectPresentationsList__Toolbar__Input"
              label={t('project-presentations.list.search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => onSearch(search)}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Box>
        <Box className="ProjectPresentationsList__Toolbar__Column">
          <Link href={ROUTES.projects.new}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<NewIcon />}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {t('project-presentations.list.commands.create')}
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
        </Box>
      </Box>

      <Box className="ProjectPresentationsList__Content">
        <Grid container spacing={2}>
          {projectPresentationsList?.map((projectPresentation) => (
            <Grid
              key={projectPresentation.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <ProjectCard projectPresentation={projectPresentation} />
            </Grid>
          ))}
        </Grid>

        {/* {total > projectPresentationsList.length && (
          <Box className="ProjectPresentationsList__LoadMore">
            <Button
              variant="outlined"
              color="primary"
              onClick={onNextPageClick}
            >
              {t('project-presentations.list.commands.show-more')}
            </Button>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

ProjectPresentationsList.defaultProps = {
  total: 0,
  projectPresentationsList: [],
};

ProjectPresentationsList.propTypes = {
  projectPresentationsList: PropTypes.array.isRequired,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onNextPageClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ProjectPresentationsList;
