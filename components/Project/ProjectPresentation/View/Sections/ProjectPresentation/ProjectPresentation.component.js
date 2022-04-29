import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import SectionPresentation from './SectionPresentation.component';
import SectionPresentationHolder from './SectionPresentationHolder.component';
import SectionTabs from './SectionTabs.component';

const ProjectPresentation = ({ projectPresentation }) => {
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
        <Typography
          className="SectionPresentation__Project__Name"
          variant="h3"
          component="h1"
          color="primary.main"
        >
          {projectPresentation.project.name}
        </Typography>
        <Box className="ProjectPresentation__SectionsPresentation">
          <Box className="SectionsPresentation__PresentationArea">
            {projectPresentation.sections.map((s, i) => (
              <SectionPresentationHolder
                value={activeSectionindex}
                index={i}
                key={i}
              >
                <SectionPresentation
                  sectionTitle={s.title}
                  description={s.description}
                  mainMedia={s.mainMedia}
                />
              </SectionPresentationHolder>
            ))}
          </Box>
          <SectionTabs
            projectPresentation={projectPresentation}
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
