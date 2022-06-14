import { Box, Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import ProjectPresentationActions from './Actions';
import SectionPresentation from './SectionPresentation.component';
import SectionPresentationHolder from './SectionPresentationHolder.component';
import SectionTabs from './SectionTabs.component';

const ProjectPresentation = ({ projectPresentation, isAdmin }) => {
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
        <Box className="ProjectPresentation__Heading">
          <Typography
            className="ProjectPresentation__Heading__Name SectionPresentation__Project__Name"
            variant="h3"
            component="h1"
            color="primary.main"
          >
            {projectPresentation.project.name}
          </Typography>
          <ProjectPresentationActions
            projectPresentation={projectPresentation}
            isAdmin={isAdmin}
          />
        </Box>
        <Box className="ProjectPresentation__SectionsPresentation">
          <Box className="SectionsPresentation__PresentationArea">
            {projectPresentation.sections?.map((s, i) => (
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

ProjectPresentation.defaultProps = {
  isAdmin: false,
};

ProjectPresentation.propTypes = {
  isAdmin: PropTypes.bool,
  projectPresentation: PropTypes.object.isRequired,
};

export default ProjectPresentation;
