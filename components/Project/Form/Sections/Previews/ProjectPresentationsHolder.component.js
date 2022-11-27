import NewIconContained from '@mui/icons-material/AddCircle';
import NewIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/Visibility';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { resolveRoute, ROUTES } from '../../../../../constants';
import PresentationSectionPreview from './PresentationSectionPreview.component';

const ProjectCorePresentationsHolder = ({ project, isMobile }) => {
  const { t } = useTranslation(['project-presentations.edit', 'common']);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className="ProjectPresentationsData ProjectPresentationsData__Container ProjectForm__Section__Container">
      {project.presentations?.map((p) => (
        <Accordion
          key={p.id}
          expanded={expanded === p.id}
          onChange={handleChange(p.id)}
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            className="ProjectPresentationsData__Summary"
            aria-controls={`${p.id}-content1`}
            id={`${p.id}-header`}
          >
            <Typography
              className="ProjectPresentationsData__Summary__Text Long"
              noWrap={true}
            >
              {p.referenceName}
            </Typography>
            <Typography className="ProjectPresentationsData__Summary__Text">
              [{p.sections?.length}
              {!isMobile
                ? p.sections?.length > 1
                  ? ' ' + `${t('common.domain.sections', { ns: 'common' })}`
                  : ' ' + `${t('common.domain.section', { ns: 'common' })}`
                : ''}
              ]
            </Typography>
            <IconButton
              onClick={() =>
                router.push(
                  resolveRoute(
                    ROUTES.projects.presentations.view,
                    p.projectId,
                    p.id
                  ),
                  null,
                  { shallow: true }
                )
              }
              className="ProjectPresentationsData__Button"
              color="primary"
              size="small"
            >
              <ViewIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() =>
                router.push(
                  resolveRoute(
                    ROUTES.projects.presentations.directEdit,
                    p.projectId,
                    p.id
                  ),
                  null,
                  { shallow: true }
                )
              }
              className="ProjectPresentationsData__Button"
              color="primary"
              size="small"
            >
              <EditIcon fontSize="small" />
            </IconButton>
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
      <Box className="ProjectPresentationsData__ListActions">
        <Button
          color="primary"
          variant="contained"
          startIcon={<NewIcon />}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
          onClick={() =>
            router.push(
              resolveRoute(
                ROUTES.projects.presentations.directEdit,
                project.id,
                ''
              ),
              null,
              { shallow: true }
            )
          }
        >
          {t('project-presentations.edit.form.commands.add-section')}
        </Button>
        <IconButton
          aria-label="create"
          color="primary"
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={() =>
            router.push(
              resolveRoute(
                ROUTES.projects.presentations.directEdit,
                project.id,
                ''
              ),
              null,
              { shallow: true }
            )
          }
        >
          <NewIconContained />
        </IconButton>
      </Box>
    </Box>
  );
};

ProjectCorePresentationsHolder.defaultProps = {
  project: {},
  isMobile: false,
};

ProjectCorePresentationsHolder.propTypes = {
  project: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default ProjectCorePresentationsHolder;
