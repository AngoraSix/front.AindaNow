import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { resolveRoute, ROUTES } from '../../../../../constants';

const ProjectPresentationDialogNavbar = ({ projectId, isEmbeddedDialog }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      className="ProjectPresentationDialogNavbar ProjectPresentationDialogNavbar__Container"
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Link
        href={resolveRoute(ROUTES.projects.edit, projectId)}
        shallow={isEmbeddedDialog}
      >
        {!isMobile ? (
          <Button
            className="ProjectPresentationDialogNavbar__Button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="text"
            startIcon={
              <ArrowBackIcon className="ProjectPresentationDialogNavbar__Button" />
            }
          >
            Go to Project
          </Button>
        ) : (
          <IconButton
            className="ProjectPresentationDialogNavbar__Button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="text"
          >
            <ArrowBackIcon className="ProjectPresentationDialogNavbar__Button" />
          </IconButton>
        )}
      </Link>
    </Box>
  );
};

ProjectPresentationDialogNavbar.defaultProps = {};

ProjectPresentationDialogNavbar.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default ProjectPresentationDialogNavbar;
