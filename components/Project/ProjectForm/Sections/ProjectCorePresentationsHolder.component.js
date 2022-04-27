import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const ProjectCorePresentationsHolder = ({
  formData,
  onFormChange,
  withDescription,
  isNotMobile,
  setIsCompleted,
  wasSubmitted,
  onInputKeyPressed,
}) => {

  const presentations = formData.presentations;

  return (
    <Box className="ProjectPresentationsData ProjectPresentationsData__Container ProjectForm__Container">
      {presentations.map((p) => (
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            className="ProjectPresentationsData__Summary"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{p.sections[0].title}</Typography>
            <IconButton
              className="ProjectPresentationsData__Button"
              color="primary"
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{p.sections[0].description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

ProjectCorePresentationsHolder.defaultProps = {
  formData: {},
  withDescription: false,
  isNotMobile: false,
  setIsCompleted: () => {},
  onInputKeyPressed: (e) => {
    e.key === 'Enter' && e.preventDefault();
  },
};

ProjectCorePresentationsHolder.propTypes = {
  formData: PropTypes.object,
  onFormChange: PropTypes.func.isRequired,
  withDescription: PropTypes.bool,
  isNotMobile: PropTypes.bool,
  wasSubmitted: PropTypes.bool,
  setIsCompleted: PropTypes.func,
  onInputKeyPressed: PropTypes.func,
};

export default ProjectCorePresentationsHolder;
