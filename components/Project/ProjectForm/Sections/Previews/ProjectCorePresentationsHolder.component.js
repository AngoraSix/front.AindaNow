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
  isNotMobile,
  setIsCompleted,
  wasSubmitted,
  onInputKeyPressed,
}) => {
  const [expanded, setExpanded] = useState(false);

  const presentations = formData.presentations;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className="ProjectPresentationsData ProjectPresentationsData__Container ProjectForm__Container">
      {presentations.map((p) => (
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
              {isNotMobile
                ? p.sections?.length > 1
                  ? ' Sections'
                  : ' Section'
                : ''}
              ]
            </Typography>
            <Link href={resolveRoute(ROUTES.projects.presentations.edit, p.id)}>
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
                isNotMobile={isNotMobile}
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
  isNotMobile: false,
  // withDescription: false,
  // setIsCompleted: () => {},
  // onInputKeyPressed: (e) => {
  //   e.key === 'Enter' && e.preventDefault();
  // },
};

ProjectCorePresentationsHolder.propTypes = {
  formData: PropTypes.object,
  isNotMobile: PropTypes.bool,
  // formData: PropTypes.object,
  // onFormChange: PropTypes.func.isRequired,
  // withDescription: PropTypes.bool,
  // isNotMobile: PropTypes.bool,
  // wasSubmitted: PropTypes.bool,
  // setIsCompleted: PropTypes.func,
  // onInputKeyPressed: PropTypes.func,
};

export default ProjectCorePresentationsHolder;
