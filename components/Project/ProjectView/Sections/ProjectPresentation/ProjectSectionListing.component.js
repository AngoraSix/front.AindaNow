import { Box, Typography } from '@mui/material';
import React from 'react';

const ProjectSectionListing = ({ children, value, index, ...other }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

ProjectSectionListing.defaultProps = {};

ProjectSectionListing.propTypes = {};

export default ProjectSectionListing;
