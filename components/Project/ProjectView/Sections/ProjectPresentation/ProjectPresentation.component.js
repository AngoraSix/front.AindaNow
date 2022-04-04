import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import ProjectSectionListing from './ProjectSectionListing.component';

const ProjectPresentation = ({ project }) => {
  const [activeSectionindex, setActiveSectionIndex] = useState(0);

  const selectSection = (asd, selectedSection) => {
    setActiveSectionIndex(selectedSection);
  };

  return (
    <Box className="ProjectPresentation ProjectPresentation__Container">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={activeSectionindex}
        onChange={selectSection}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {project.sections.map((s) => (
          <Tab label={s.title} />
        ))}
      </Tabs>
      {project.sections.map((s, i) => (
        <ProjectSectionListing value={activeSectionindex} index={i}>
          {s.description}
        </ProjectSectionListing>
      ))}
    </Box>
  );
};

ProjectPresentation.defaultProps = {};

ProjectPresentation.propTypes = {};

export default ProjectPresentation;
