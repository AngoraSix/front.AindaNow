import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { resolveRoute, ROUTES } from '../../../../constants';

const DialogEmbeddedNavbar = ({ projectPresentation, isEmbeddedDialog }) => {
  return (
    <Box
      className="DialogEmbeddedNavbar DialogEmbeddedNavbar__Container"
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Link
        href={resolveRoute(ROUTES.projects.edit, projectPresentation.projectId)}
        shallow={isEmbeddedDialog}
      >
        {isEmbeddedDialog ? (
          <Button
            className="DialogEmbeddedNavbar__Button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="text"
            startIcon={
              <ArrowBackIcon className="DialogEmbeddedNavbar__Button" />
            }
          >
            Go to Project
          </Button>
        ) : (
          <IconButton
            className="DialogEmbeddedNavbar__Button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="text"
          >
            <ArrowBackIcon className="DialogEmbeddedNavbar__Button" />
          </IconButton>
        )}
      </Link>
    </Box>
  );
};

DialogEmbeddedNavbar.defaultProps = {
  projectPresentation: false,
};

DialogEmbeddedNavbar.propTypes = {
  projectPresentation: PropTypes.object.isRequired,
};

export default DialogEmbeddedNavbar;
