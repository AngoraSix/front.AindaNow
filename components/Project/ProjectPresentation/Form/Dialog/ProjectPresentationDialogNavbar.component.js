import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { resolveRoute, ROUTES } from '../../../../../constants';

const ProjectPresentationDialogNavbar = ({ projectId, isEmbeddedDialog }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      className="ProjectPresentationDialogNavbar ProjectPresentationDialogNavbar__Container"
      sx={{ backgroundColor: 'primary.main' }}
    >
      {!isMobile ? (
        <Button
          className="ProjectPresentationDialogNavbar__Button"
          onClick={() =>
            router.push(resolveRoute(ROUTES.projects.edit, projectId), null, {
              shallow: isEmbeddedDialog,
            })
          }
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
          onClick={() =>
            router.push(resolveRoute(ROUTES.projects.edit, projectId), null, {
              shallow: isEmbeddedDialog,
            })
          }
          variant="text"
        >
          <ArrowBackIcon className="ProjectPresentationDialogNavbar__Button" />
        </IconButton>
      )}
    </Box>
  );
};

ProjectPresentationDialogNavbar.defaultProps = {};

ProjectPresentationDialogNavbar.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default ProjectPresentationDialogNavbar;
