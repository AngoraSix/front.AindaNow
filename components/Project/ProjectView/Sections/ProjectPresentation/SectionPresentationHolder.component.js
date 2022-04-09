import { Box } from '@mui/material';
import React from 'react';

const SectionPresentationHolder = ({ children, value, index, ...other }) => {
  return (
    <Box
      className="SectionPresentationHolder SectionPresentationHolder__Container"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

SectionPresentationHolder.defaultProps = {};

SectionPresentationHolder.propTypes = {};

export default SectionPresentationHolder;
