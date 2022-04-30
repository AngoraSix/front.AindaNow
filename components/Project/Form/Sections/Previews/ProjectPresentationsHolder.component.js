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
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { resolveRoute, ROUTES } from '../../../../../constants';
import PresentationSectionPreview from './PresentationSectionPreview.component';

const ProjectCorePresentationsHolder = ({
  formData,
  onFormChange,
  withDescription,
  isMobile,
  setIsCompleted,
  wasSubmitted,
  onInputKeyPressed,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className="ProjectPresentationsData ProjectPresentationsData__Container ProjectForm__Container">
      {formData.presentations.map((p) => (
        <Accordion
          key={p.id}
          expanded={expanded === p.id}
          onChange={handleChange(p.id)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            className="ProjectPresentationsData__Summary"
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${p.id}-content1`}
            id={`${p.id}-header`}
          >
            <Typography
              className="ProjectPresentationsData__Summary__Text"
              noWrap={true}
            >
              {p.sections[0].title} [{p.sections?.length}
              {!isMobile
                ? p.sections?.length > 1
                  ? ' Sections'
                  : ' Section'
                : ''}
              ]
            </Typography>
            <Link href={resolveRoute(ROUTES.projects.presentations.edit, p.projectId, p.id)}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="ProjectPresentationsData__Button"
                color="primary"
                size="small"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
          </AccordionSummary>
          <AccordionDetails>
            {p.sections.map((ps) => (
              <PresentationSectionPreview
                key={ps.title}
                presentationSection={ps}
                isMobile={isMobile}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

ProjectCorePresentationsHolder.defaultProps = {
  formData: {},
  isMobile: false,
};

ProjectCorePresentationsHolder.propTypes = {
  formData: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default ProjectCorePresentationsHolder;
