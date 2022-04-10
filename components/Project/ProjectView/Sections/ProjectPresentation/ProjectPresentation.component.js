import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  SwipeableDrawer,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import SectionPresentation from './SectionPresentation.component';
import SectionPresentationHolder from './SectionPresentationHolder.component';
import { useTheme } from '@mui/styles';
import SectionTabs from './SectionTabs.component';

const ProjectPresentation = ({ project }) => {
  const [activeSectionindex, setActiveSectionIndex] = useState(0);
  const presentationRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      presentationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  }, []);

  return (
    <Box className="ProjectPresentation ProjectPresentation__Container">
      <Box
        ref={presentationRef}
        className="ProjectPresentation__AreaExtension"
      />
      <Paper className="ProjectPresentation__MainSection">
        {project.name && ( // @TODO, should be always present after Trello-Ndk3m28f
          <Typography variant="h1" component="h3" color="primary.main">
            {project.name}
          </Typography>
        )}
        <Box className="ProjectPresentation__SectionsPresentation">
          <Box className="SectionsPresentation__PresentationArea">
            {project.sections.map((s, i) => (
              <SectionPresentationHolder
                value={activeSectionindex}
                index={i}
                key={i}
              >
                <SectionPresentation
                  sectionTitle={s.title !== project.name ? s.title : null}
                  description={s.description}
                  mainMedia={s.mainMedia}
                />
              </SectionPresentationHolder>
            ))}
          </Box>
          <SectionTabs
            project={project}
            setActiveSectionIndex={setActiveSectionIndex}
            activeSectionindex={activeSectionindex}
          />
        </Box>
      </Paper>
    </Box>
  );
};

ProjectPresentation.defaultProps = {};

ProjectPresentation.propTypes = {};

export default ProjectPresentation;
